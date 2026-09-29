import test from 'node:test';
import assert from 'node:assert/strict';
import { watchHeroPlayback } from '../src/lib/heroPlayback.ts';

function setup(t, play) {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const doc = Object.assign(new EventTarget(), { visibilityState: 'visible' });
  const win = Object.assign(new EventTarget(), { innerHeight: 900 });
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const originals = ['document', 'window', 'IntersectionObserver'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]);
  Object.assign(globalThis, { document: doc, window: win, IntersectionObserver: Observer });
  const video = Object.assign(new EventTarget(), {
    paused: true, readyState: 4, currentTime: 12, plays: 0,
    getBoundingClientRect: () => ({ top: 0, bottom: 900 }),
    setAttribute() {},
    play() { this.plays++; return play.call(this); },
    pause() { this.paused = true; this.dispatchEvent(new Event('pause')); },
  });
  let started = 0, failed = 0;
  const cleanup = watchHeroPlayback(video, () => started++, () => failed++);
  t.after(() => {
    cleanup();
    originals.forEach(([key, descriptor]) => descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]);
  });
  return { video, doc, win, observer, cleanup, stats: () => ({ started, failed }) };
}
const success = function () { this.paused = false; this.dispatchEvent(new Event('playing')); return Promise.resolve(); };
const flush = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };

test('animation starts only on actual playing; blocked promise falls back at four seconds', t => {
  const env = setup(t, () => new Promise(() => {}));
  env.video.dispatchEvent(new Event('canplay'));
  t.mock.timers.tick(3999);
  assert.deepEqual(env.stats(), { started: 0, failed: 0 });
  t.mock.timers.tick(1);
  assert.deepEqual(env.stats(), { started: 0, failed: 1 });
});
test('autoplay rejection uses static fallback once', async t => {
  const env = setup(t, () => Promise.reject(new DOMException('blocked', 'NotAllowedError')));
  await flush(); t.mock.timers.tick(5000);
  assert.deepEqual(env.stats(), { started: 0, failed: 1 });
});
test('an initial pending video falls back even when the tab becomes hidden', t => {
  const env = setup(t, () => new Promise(() => {}));
  env.doc.visibilityState = 'hidden'; env.doc.dispatchEvent(new Event('visibilitychange'));
  t.mock.timers.tick(4000);
  assert.equal(env.stats().failed, 1);
});
test('off-screen pause preserves playback position and never triggers fallback', async t => {
  const env = setup(t, success);
  await flush();
  env.observer.callback([{ isIntersecting: false }]);
  assert.equal(env.video.paused, true);
  t.mock.timers.tick(5000);
  assert.equal(env.stats().failed, 0);
  env.observer.callback([{ isIntersecting: true }]);
  assert.equal(env.video.paused, false);
  assert.equal(env.video.currentTime, 12);
});
test('a rejection after leaving the viewport does not remove the intro', async t => {
  let reject;
  const env = setup(t, () => new Promise((_, no) => { reject = no; }));
  env.observer.callback([{ isIntersecting: false }]);
  reject(new DOMException('interrupted', 'NotAllowedError'));
  await flush(); t.mock.timers.tick(5000);
  assert.equal(env.stats().failed, 0);
});
test('background tab pauses, foreground resumes and cleanup disconnects', async t => {
  const env = setup(t, success);
  await flush();
  env.doc.visibilityState = 'hidden'; env.doc.dispatchEvent(new Event('visibilitychange'));
  assert.equal(env.video.paused, true);
  t.mock.timers.tick(5000); assert.equal(env.stats().failed, 0);
  env.doc.visibilityState = 'visible'; env.doc.dispatchEvent(new Event('visibilitychange'));
  assert.equal(env.video.paused, false);
  env.cleanup(); assert.equal(env.observer.disconnected, true);
});
