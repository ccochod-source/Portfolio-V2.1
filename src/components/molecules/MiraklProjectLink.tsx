'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { MIRAKL_PATH, MIRAKL_SESSION_KEY, MIRAKL_STATIC_QUERY, shouldPlayMiraklTransition } from '@/lib/miraklTransition';
import styles from './MiraklProjectLink.module.css';

type SceneModule = typeof import('@/lib/miraklScene');
let sceneModule: Promise<SceneModule> | undefined;
let seenInMemory = false;
let warmed = false;

function hasSeenIntro() {
  if (seenInMemory) return true;
  try { return sessionStorage.getItem(MIRAKL_SESSION_KEY) === '1'; } catch { return false; }
}

function loadScene() {
  return sceneModule ??= import('@/lib/miraklScene').catch(error => {
    sceneModule = undefined;
    throw error;
  });
}

/** A real link remains available to crawlers, new tabs and visitors without JS. */
export function MiraklProjectLink({ className }: { className?: string }) {
  const router = useRouter();
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [ready, setReady] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const finish = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    router.push(MIRAKL_PATH);
    // Keep a navigation escape hatch if a route request fails or never settles.
    fallback.current = setTimeout(() => {
      if (window.location.pathname !== MIRAKL_PATH) window.location.assign(MIRAKL_PATH);
    }, 4000);
  }, [router]);

  function warm() {
    if (window.matchMedia(MIRAKL_STATIC_QUERY).matches || hasSeenIntro()) return;
    router.prefetch(MIRAKL_PATH);
    void loadScene().catch(() => {});
    if (!warmed) {
      warmed = true;
      for (const name of ['scene.webp', 'message-clean.webp']) {
        const image = new window.Image();
        image.src = `/projects/mirakl-motion/${name}`;
      }
    }
  }

  function open(event: MouseEvent<HTMLAnchorElement>) {
    const desktop = !window.matchMedia(MIRAKL_STATIC_QUERY).matches;
    if (!shouldPlayMiraklTransition({
      desktop, seen: hasSeenIntro(), button: event.button,
      modified: event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
      defaultPrevented: event.defaultPrevented,
    }) || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
    event.preventDefault();
    seenInMemory = true;
    try { sessionStorage.setItem(MIRAKL_SESSION_KEY, '1'); } catch { /* Memory fallback for restricted storage. */ }
    router.prefetch(MIRAKL_PATH);
    navigating.current = false;
    setReady(false);
    setOrigin((event.currentTarget.closest('article') ?? event.currentTarget).getBoundingClientRect());
  }

  useEffect(() => {
    if (!origin) return;
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!dialog || !panel || !stage || !canvas) { finish(); return; }
    let disposed = false;
    let cleanupScene: (() => void) | undefined;
    let entrance: Animation | undefined;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    try { dialog.showModal(); } catch { finish(); return; }
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    const rect = panel.getBoundingClientRect();
    if (typeof panel.animate === 'function') {
      const dx = origin.x + origin.width / 2 - (rect.x + rect.width / 2);
      const dy = origin.y + origin.height / 2 - (rect.y + rect.height / 2);
      entrance = panel.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${Math.min(1, Math.max(.35, origin.width / rect.width))})`, opacity: .45 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ], { duration: 360, easing: 'cubic-bezier(.2,.75,.25,1)' });
    }
    // Never hold up the project for missing images or a failed JS chunk.
    const loadingDeadline = setTimeout(finish, 2500);
    void loadScene().then(({ mountMiraklScene }) => {
      if (disposed || navigating.current) return;
      cleanupScene = mountMiraklScene(stage, canvas, {
        onReady: () => { clearTimeout(loadingDeadline); setReady(true); },
        onProgress: (progress: number) => {
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        },
        onComplete: finish,
        onError: finish,
      });
    }).catch(() => { if (!disposed) finish(); });
    const media = window.matchMedia(MIRAKL_STATIC_QUERY);
    const onPreferenceChange = () => { if (media.matches) finish(); };
    const onVisibilityChange = () => { if (document.hidden) finish(); };
    media.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      disposed = true;
      cleanupScene?.();
      entrance?.cancel();
      clearTimeout(loadingDeadline);
      if (fallback.current) clearTimeout(fallback.current);
      media.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [origin, finish]);

  return <>
    <Link href={MIRAKL_PATH} className={`${className ?? ''} ${styles.cardLink}`}
      aria-label="Voir la fiche du projet Mirakl" onClick={open} onPointerEnter={warm} onFocus={warm}>
      Voir la fiche →
    </Link>
    {origin && createPortal(
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} aria-modal="true"
        data-lenis-prevent onCancel={event => { event.preventDefault(); finish(); }}>
        <div ref={panelRef} className={styles.panel}>
          <div ref={stageRef} className={styles.stage}>
            <header className={styles.heading}>
              <h2 id={titleId}>Mirakl Connect</h2>
              <p>Prospection automatisée</p>
            </header>
            <canvas ref={canvasRef} aria-hidden="true" />
            {!ready && <p className={styles.loading} role="status">Ouverture du projet…</p>}
          </div>
          <div className={styles.actions}>
            <p>Découvrir le projet Mirakl</p>
            <a ref={skipRef} href={MIRAKL_PATH} onClick={event => {
              if (!navigating.current) { event.preventDefault(); finish(); }
            }}>Passer → Voir le projet</a>
          </div>
          <div className={styles.track} aria-hidden="true"><div ref={progressRef} className={styles.progress} /></div>
        </div>
      </dialog>, document.body,
    )}
  </>;
}
