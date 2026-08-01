"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import type { GalleryItem } from "@/components/sections/gallery/GalleryGrid";

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const { t } = useTranslation();
  const current = images[currentIndex];

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t("gallery.lightbox.close")}
            className="absolute end-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onPrev}
            aria-label={t("gallery.lightbox.previous")}
            className="absolute start-2 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:start-4 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-6 w-6 rtl:rotate-180" aria-hidden="true" />
          </button>

          <motion.div
            key={current.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) onPrev();
              else if (info.offset.x < -50) onNext();
            }}
            className="flex w-full max-w-4xl flex-col items-center px-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex aspect-video w-full max-w-4xl items-center justify-center rounded-xl bg-neutral-800 px-4 text-center text-xl text-white">
              {current.placeholder}
            </div>
            <p className="mt-4 text-center text-lg font-medium text-white">
              {current.title}
            </p>
            <p className="mt-2 text-center text-sm text-white/60">
              {currentIndex + 1} {t("gallery.lightbox.of")} {images.length}
            </p>
          </motion.div>

          <button
            type="button"
            onClick={onNext}
            aria-label={t("gallery.lightbox.next")}
            className="absolute end-2 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:end-4 md:h-12 md:w-12"
          >
            <ChevronRight className="h-6 w-6 rtl:rotate-180" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
