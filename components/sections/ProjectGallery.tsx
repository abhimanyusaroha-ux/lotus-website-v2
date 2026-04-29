"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Project, ProjectImage } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type RowType = "A" | "B" | "C";
type Row = { type: RowType; indices: number[] };

const PATTERN: RowType[] = ["A", "B", "C", "A", "B", "C", "A", "B"];

function buildRows(count: number): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let p = 0;
  while (i < count) {
    const type = PATTERN[p % PATTERN.length];
    if (type === "B") {
      rows.push({ type, indices: [i] });
      i += 1;
    } else {
      // A or C — needs 2 images; if only 1 left, fall back to B
      if (i + 1 >= count) {
        rows.push({ type: "B", indices: [i] });
        i += 1;
      } else {
        rows.push({ type, indices: [i, i + 1] });
        i += 2;
      }
    }
    p += 1;
  }
  return rows;
}

/* ──────────────────────────────────────────────────────────────────────────
   Gallery image card (individual)
   ────────────────────────────────────────────────────────────────────────── */

function GalleryImage({
  image,
  index,
  aspect,
  onOpen,
  imgRef,
  innerRef,
}: {
  image: ProjectImage;
  index: number;
  aspect: string;
  onOpen: (i: number) => void;
  imgRef: (el: HTMLDivElement | null) => void;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group block relative w-full overflow-hidden text-left cursor-pointer"
      aria-label={`Open image: ${image.alt}`}
    >
      <div
        ref={imgRef}
        className="gallery-clip relative w-full overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        <div
          ref={innerRef}
          className="gallery-inner absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          style={{ transformOrigin: "center" }}
        >
          <Image
            src={image.src}
            fill
            alt={image.alt}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Hover overlay — Expand pill */}
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 caption font-sans text-canvas uppercase tracking-[0.12em] bg-ink/40 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          aria-hidden="true"
        >
          Expand
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M3 1H9V7M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Lightbox
   ────────────────────────────────────────────────────────────────────────── */

function Lightbox({
  images,
  open,
  initialIndex,
  onClose,
}: {
  images: ProjectImage[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const activeImgRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) setActiveIndex(initialIndex);
  }, [open, initialIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Open / close animation, body lock, focus management
  useEffect(() => {
    if (!open) return;

    previousActiveRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const overlay = overlayRef.current;
    const img = activeImgRef.current;
    const film = filmstripRef.current;

    if (overlay) {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: reduce ? 0 : 0.3, ease: "power3.out" }
      );
    }
    if (img && !reduce) {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
    if (film && !reduce) {
      gsap.fromTo(
        film,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }

    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousActiveRef.current?.focus();
    };
  }, [open, onClose, goNext, goPrev]);

  // Crossfade on activeIndex change
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = activeImgRef.current;
    if (!img) return;

    const fromX = direction * 32;
    gsap.fromTo(
      img,
      { opacity: 0, x: fromX },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      }
    );
  }, [activeIndex, direction, open]);

  if (!open) return null;

  const active = images[activeIndex];
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    images.length
  ).padStart(2, "0")}`;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project gallery"
      className="fixed inset-0 z-[200] bg-ink/95"
      style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      {/* Counter (top center) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 caption font-sans text-canvas uppercase tracking-[0.12em] z-10 select-none">
        {counter}
      </div>

      {/* Close (top right) */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-6 right-6 w-14 h-14 rounded-full border border-canvas flex items-center justify-center text-canvas hover:bg-canvas hover:text-ink transition-colors duration-200 z-10"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Left arrow */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-canvas flex items-center justify-center text-canvas hover:bg-canvas hover:text-ink transition-colors duration-200 z-10"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M6 1L1 6L6 11M1 6H15"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-canvas flex items-center justify-center text-canvas hover:bg-canvas hover:text-ink transition-colors duration-200 z-10"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M10 1L15 6L10 11M15 6H1"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Active image — centered, max 90vw / 70vh */}
      <div className="absolute inset-0 flex items-center justify-center px-24 max-[768px]:px-6 pb-32 pt-20">
        <div
          ref={activeImgRef}
          key={activeIndex}
          className="relative w-full h-full max-w-[90vw] max-h-[70vh] overflow-hidden"
        >
          <Image
            src={active.src}
            fill
            alt={active.alt}
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* Filmstrip */}
      <div
        ref={filmstripRef}
        className="absolute bottom-6 left-0 right-0 flex justify-center"
      >
        <div className="flex gap-3 overflow-x-auto scrollbar-hide max-w-full px-6 snap-x">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={`relative flex-shrink-0 w-20 h-[60px] overflow-hidden snap-start transition-opacity duration-200 ${
                i === activeIndex
                  ? "opacity-100 outline outline-1 outline-canvas outline-offset-[-1px]"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                fill
                alt=""
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Gallery
   ────────────────────────────────────────────────────────────────────────── */

export function ProjectGallery({ project }: { project: Project }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const rows = buildRows(project.galleryImages.length);

  // Reset image refs when project changes (4 different project routes)
  useEffect(() => {
    imgRefs.current = imgRefs.current.slice(0, project.galleryImages.length);
    innerRefs.current = innerRefs.current.slice(
      0,
      project.galleryImages.length
    );
  }, [project.galleryImages.length]);

  // Scroll-in stagger reveal — by row
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    const tweens: gsap.core.Tween[] = [];

    rows.forEach((row, rowIdx) => {
      row.indices.forEach((imgIdx) => {
        const clip = imgRefs.current[imgIdx];
        const inner = innerRefs.current[imgIdx];
        if (!clip || !inner) return;

        gsap.set(clip, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(inner, { scale: 1.06 });

        const trigger = {
          trigger: clip,
          start: "top 90%",
          once: true,
        } as const;

        tweens.push(
          gsap.to(clip, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            delay: rowIdx * 0.05,
            ease: "power3.out",
            scrollTrigger: trigger,
          })
        );
        tweens.push(
          gsap.to(inner, {
            scale: 1,
            duration: 1.6,
            delay: rowIdx * 0.05,
            ease: "power3.out",
            scrollTrigger: trigger,
          })
        );
      });
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [project.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const renderImage = (idx: number, aspect: string) => (
    <GalleryImage
      key={`${project.slug}-${idx}`}
      image={project.galleryImages[idx]}
      index={idx}
      aspect={aspect}
      onOpen={openLightbox}
      imgRef={(el) => {
        imgRefs.current[idx] = el;
      }}
      innerRef={(el) => {
        innerRefs.current[idx] = el;
      }}
    />
  );

  return (
    <>
      <section
        aria-label="Project gallery"
        className="pb-[120px] max-[640px]:pb-20"
      >
        <div ref={galleryRef} className="space-y-16 max-[640px]:space-y-10">
          {rows.map((row, i) => {
            if (row.type === "B") {
              return (
                <div key={i} className="flex justify-center">
                  <div className="w-[80vw]">
                    {renderImage(row.indices[0], "16 / 9")}
                  </div>
                </div>
              );
            }

            const [a, b] = row.indices;
            const grid =
              row.type === "A"
                ? "grid-cols-[60%_40%] max-[768px]:grid-cols-1"
                : "grid-cols-[40%_60%] max-[768px]:grid-cols-1";

            return (
              <div
                key={i}
                className={`max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6`}
              >
                <div className={`grid ${grid} gap-8 max-[768px]:gap-10`}>
                  {renderImage(a, "4 / 3")}
                  {b !== undefined && renderImage(b, "4 / 3")}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Lightbox
        images={project.galleryImages}
        open={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={closeLightbox}
      />
    </>
  );
}
