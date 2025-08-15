"use client";
import MasonryLayout from "@/components/common/MasonryLayout";
import { IGalleryData } from "@/types/gallery";
import { useEffect, useState } from "react";
import AddNewGallery from "./AddNewGallery";
import { GalleryContextProvider } from "@/context/Gallery/GalleryEditProvider";

type Props = {};

export default function DashboardGallery({}: Props) {
  const [galleryData, setGalleryData] = useState<IGalleryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://agrani-doer-backend-ro9fiezz5-mdsefatalams-projects.vercel.app/gallery")
      .then((res) => res.json())
      .then((data) => setGalleryData(data))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <GalleryContextProvider>
        <AddNewGallery
          setGalleryData={setGalleryData}
          imageData={galleryData}
        />
        <MasonryLayout
          imageData={galleryData}
          isDashboard
          setImageData={setGalleryData}
        />
      </GalleryContextProvider>
    </div>
  );
}
