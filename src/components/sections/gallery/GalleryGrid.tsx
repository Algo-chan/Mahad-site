"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  src?: string;
  placeholder?: string;
}

export function GalleryGrid({
  images,
  onImageClick,
}: {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
}) {
  const { t } = useTranslation();

  if (images.length === 0) {
    return (
      <section className="bg-white pb-16 dark:bg-neutral-950 md:pb-24">
        <Container>
          <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">
            {t("gallery.noResults")}
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white pb-16 dark:bg-neutral-950 md:pb-24">
      <Container>
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => onImageClick(index)}
                  className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800"
                  aria-label={image.title}
                >
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-neutral-500 dark:text-neutral-500">
                      {image.placeholder ?? image.title}
                    </span>
                  )}
                  <span className="absolute inset-0 hidden items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                    <Eye className="h-8 w-8 text-white" aria-hidden="true" />
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
