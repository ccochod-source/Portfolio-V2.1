import assert from 'node:assert/strict';
import { test } from 'node:test';
import { watchHeroPlayback } from '../src/lib/heroPlayback.ts';

class FakeVideo extends EventTarget {
  paused = true;
  readyState = 0;
  attributes = new Map();
  play = () => Promise.resolve();
  pause() { this.paused = true; }
  getBoundingClientRect() { return { top: 0, bottom: 800 }; }
  setAttribute(key, value) { this.attributes.set(key, value); }
}

function setup(t) {
  const document = new EventTarget();
  document.visibilityState = 'visible';
  globalThis.document = document;
  globalThis.window = new EventTarget();
  globalThis.window.innerHeight = 800;
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const video = new FakeVideo();
  let starts = 0;
  let failures = 0;
  let cleanup;
  const watch = () => { cleanup = watchHeroPlayback(video, () => starts++, () => failures++); };
  t.after(() => { cleanup?.(); delete globalThis.document; delete globalThis.window; });
  return { video, document, watch, cleanup: () => cleanup(), starts: () => starts, failures: () => failures };
}

test('requires actual playing before enabling animation and clears startup deadline', t => {
  const s = setup(t);
  s.watch();
  assert.equal(s.video.muted, true);
  assert.equal(s.video.defaultMuted, true);
  assert.equal(s.video.playsInline, true);
  s.video.dispatchEvent(new Event('canplay'));
  assert.equal(s.starts(), 0);
  s.video.dispatchEvent(new Event('playing'));
  t.mock.timers.tick(5000);
  assert.equal(s.starts(), 1);
  assert.equal(s.failures(), 0);
});

test('blocked autoplay immediately falls back, without waiting for user gesture', async t => {
  const s = setup(t);
  s.video.play = () => Promise.reject(new DOMException('Blocked', 'NotAllowedError'));
  s.watch();
  await Promise.resolve();
  assert.equal(s.failures(), 1);
  t.mock.timers.tick(5000);
  assert.equal(s.failures(), 1);
});

test('unresolved playback falls back after four seconds', t => {
  const s = setup(t);
  s.video.play = () => new Promise(() => {});
  s.watch();
  t.mock.timers.tick(3999);
  assert.equal(s.failures(), 0);
  t.mock.timers.tick(1);
  assert.equal(s.failures(), 1);
});

test('media error falls back and late playing event cannot restart animation', t => {
  const s = setup(t);
  s.watch();
  s.video.dispatchEvent(new Event('error'));
  s.video.dispatchEvent(new Event('playing'));
  assert.equal(s.failures(), 1);
  assert.equal(s.starts(), 0);
});

test('prolonged buffering falls back, recovered buffering does not', t => {
  const s = setup(t);
  s.watch();
  s.video.dispatchEvent(new Event('playing'));
  s.video.dispatchEvent(new Event('waiting'));
  t.mock.timers.tick(2000);
  s.video.dispatchEvent(new Event('playing'));
  t.mock.timers.tick(5000);
  assert.equal(s.failures(), 0);
  s.video.dispatchEvent(new Event('waiting'));
  t.mock.timers.tick(4000);
  assert.equal(s.failures(), 1);
});

test('background tab cancels timeout; foreground retries with a new deadline', t => {
  const s = setup(t);
  s.watch();
  s.document.visibilityState = 'hidden';
  s.document.dispatchEvent(new Event('visibilitychange'));
  t.mock.timers.tick(10000);
  assert.equal(s.failures(), 0);
  s.document.visibilityState = 'visible';
  s.document.dispatchEvent(new Event('visibilitychange'));
  t.mock.timers.tick(4000);
  assert.equal(s.failures(), 1);
});

test('unmount removes listeners and deadlines, including late promise rejection', async t => {
  const s = setup(t);
  let reject;
  s.video.play = () => new Promise((_, failure) => { reject = failure; });
  s.watch();
  s.cleanup();
  reject(new DOMException('Blocked', 'NotAllowedError'));
  await Promise.resolve();
  s.video.dispatchEvent(new Event('playing'));
  t.mock.timers.tick(5000);
  assert.equal(s.starts(), 0);
  assert.equal(s.failures(), 0);
});

test('Safari pausing an off-screen video does not collapse content above the reader', t => {
  const s = setup(t);
  s.watch();
  s.video.dispatchEvent(new Event('playing'));
  s.video.getBoundingClientRect = () => ({ top: -1000, bottom: -200 });
  s.video.dispatchEvent(new Event('pause'));
  t.mock.timers.tick(5000);
  assert.equal(s.failures(), 0);
});
