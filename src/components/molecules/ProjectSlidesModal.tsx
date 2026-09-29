'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/atoms/Button';

interface ProjectSlidesModalProps {
  slideshowSrcs: readonly string[];
  projectTitle: string;
}

export function ProjectSlidesModal({ slideshowSrcs, projectTitle }: ProjectSlidesModalProps) {
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const navHintId = useId();

  const onClose = useCallback(() => setOpen(false), []);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(slideshowSrcs.length - 1, i + 1));
  }, [slideshowSrcs.length]);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const controls = Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
      }
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIndex((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSlideIndex((i) => Math.min(slideshowSrcs.length - 1, i + 1));
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onClose, slideshowSrcs.length]);

  if (slideshowSrcs.length === 0) return null;

  const src = slideshowSrcs[slideIndex];
  const total = slideshowSrcs.length;

  return (
    <section className="mb-12" aria-labelledby="slideshow-heading">
      <h2 id="slideshow-heading" className="text-lg font-semibold text-text-dark mb-2">
        Mockups &amp; présentation (slides)
      </h2>
      <p className="text-sm text-text-light mb-4">
        Slides exportées en PNG : elles restituent tout le déroulé du pitch dans une fenêtre plein écran.
      </p>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={() => {
          setSlideIndex(0);
          setOpen(true);
        }}
      >
        Ouvrir la présentation (slides)
      </Button>

      {open && (
          <dialog
            ref={dialogRef}
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={navHintId}
            className="m-auto h-[min(90svh,900px)] w-[calc(100%-1.5rem)] max-w-4xl flex-col rounded-2xl border border-sand/80 bg-cream p-0 text-text-dark shadow-xl outline-none open:flex backdrop:bg-black/55 backdrop:backdrop-blur-sm"
            tabIndex={-1}
            onCancel={(event) => { event.preventDefault(); onClose(); }}
            onClick={(event) => { if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
            } }}
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-sand/60 px-4 py-3 md:px-6">
              <h3 id={titleId} className="text-base font-semibold text-text-dark truncate">
                Slides — {projectTitle}
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-text-dark hover:bg-sand-light focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                onClick={onClose}
              >
                Fermer
              </button>
            </header>

            <div className="relative flex min-h-[200px] flex-1 items-center justify-center overflow-hidden px-3 py-4 md:px-6">
              <figure className="m-0 flex max-h-[min(72vh,700px)] w-full items-center justify-center">
                <Image
                  key={src}
                  src={src}
                  alt={`Slide ${slideIndex + 1} sur ${total} — ${projectTitle}`}
                  width={1600}
                  height={900}
                  className="mx-auto h-auto max-h-[min(72vh,700px)] w-auto max-w-full rounded-xl border border-sand/60 bg-white object-contain shadow-sm"
                  sizes="(max-width: 896px) 96vw, 896px"
                  priority
                />
              </figure>
            </div>

            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-sand/40 px-4 py-3 md:px-6">
              <button
                type="button"
                disabled={slideIndex <= 0}
                onClick={goPrev}
                className="rounded-lg border border-sand bg-white px-4 py-2 text-sm font-medium text-text-dark hover:bg-sand-light disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                ← Précédente
              </button>
              <div className="flex flex-col items-center gap-1 text-center">
                <p id={navHintId} className="text-xs text-text-light max-w-[18rem] md:max-w-none">
                  Flèches <kbd className="rounded border border-sand/80 bg-white px-1">←</kbd>{' '}
                  <kbd className="rounded border border-sand/80 bg-white px-1">→</kbd> pour naviguer
                </p>
                <p className="text-sm font-medium text-text-dark tabular-nums" aria-live="polite" aria-atomic="true">
                  Slide {slideIndex + 1} / {total}
                </p>
              </div>
              <button
                type="button"
                disabled={slideIndex >= total - 1}
                onClick={goNext}
                className="rounded-lg border border-sand bg-white px-4 py-2 text-sm font-medium text-text-dark hover:bg-sand-light disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Suivante →
              </button>
            </footer>
          </dialog>
      )}
    </section>
  );
}
