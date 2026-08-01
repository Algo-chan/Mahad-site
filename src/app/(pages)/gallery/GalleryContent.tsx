"use client";

import * as React from "react";
import galleryData from "@/data/gallery.json";
import { FilterBar } from "@/components/sections/gallery/FilterBar";
import { GalleryGrid, type GalleryItem } from "@/components/sections/gallery/GalleryGrid";
import { Lightbox } from "@/components/sections/gallery/Lightbox";
import { PageHero } from "@/components/sections/gallery/PageHero";

export function GalleryContent() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const images = galleryData as GalleryItem[];
  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () =>
    setCurrentIndex((currentIndex + 1) % filteredImages.length);

  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + filteredImages.length) % filteredImages.length);

  return (
    <>
      <PageHero />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <GalleryGrid images={filteredImages} onImageClick={openLightbox} />
      <Lightbox
        images={filteredImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
