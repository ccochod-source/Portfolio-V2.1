// Treat decorative video as an enhancement: never leave a blocked player
// in control of the page. No user-gesture listeners or autoplay-policy bypass.
export function watchHeroPlayback(
  video: HTMLVideoElement,
  onPlaying: () => void,
  onUnavailable: () => void,
  timeoutMs = 4000,
) {
  let disposed = false;
  let failed = false;
  let pending = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const clearDeadline = () => clearTimeout(timer);
  const fail = () => {
    if (disposed || failed) return;
    failed = true;
    clearDeadline();
    onUnavailable();
  };
  const armDeadline = () => {
    clearDeadline();
    if (document.visibilityState === 'visible') timer = setTimeout(() => {
      // Safari may intentionally pause an off-screen video. Do not remove
      // the pinned section under a visitor already reading the content below.
      const rect = video.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) fail();
    }, timeoutMs);
  };
  const playing = () => {
    if (disposed || failed) return;
    clearDeadline();
    onPlaying();
  };
  const start = () => {
    if (disposed || failed || pending || document.visibilityState !== 'visible') return;
    if (!video.paused) return;
    pending = true;
    void video.play().catch((error: unknown) => {
      if (disposed || failed) return;
      // AbortError can happen on a normal background/foreground transition.
      // The deadline still bounds a promise that never resolves.
      if (!(error instanceof DOMException && error.name === 'AbortError')) fail();
    }).finally(() => { pending = false; });
  };
  const resume = () => {
    if (document.visibilityState !== 'visible') {
      clearDeadline();
      return;
    }
    if (video.paused || video.readyState < 3) {
      armDeadline();
      start();
    }
  };
  const stalled = () => {
    armDeadline();
  };
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.addEventListener('playing', playing);
  video.addEventListener('error', fail);
  video.addEventListener('pause', stalled);
  video.addEventListener('waiting', stalled);
  video.addEventListener('canplay', start);
  document.addEventListener('visibilitychange', resume);
  window.addEventListener('pageshow', resume);
  armDeadline();
  if (!video.paused && video.readyState >= 3) playing();
  else start();
  return () => {
    disposed = true;
    clearDeadline();
    video.removeEventListener('playing', playing);
    video.removeEventListener('error', fail);
    video.removeEventListener('pause', stalled);
    video.removeEventListener('waiting', stalled);
    video.removeEventListener('canplay', start);
    document.removeEventListener('visibilitychange', resume);
    window.removeEventListener('pageshow', resume);
    video.pause();
  };
}
