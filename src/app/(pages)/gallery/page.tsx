import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
