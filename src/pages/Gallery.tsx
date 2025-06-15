import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";
import { ImageModal } from "@/components/ImageModal";

export default function Gallery() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(weddingData.galleryPhotos.slice(0, 6));
  const [selectedImage, setSelectedImage] = useState<{url: string; alt: string} | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Simulate loading more photos
          setTimeout(() => {
            setPhotos((prev) => [
              ...prev,
              ...weddingData.galleryPhotos.slice(prev.length, prev.length + 3),
            ]);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8E0E0] p-4">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl font-bold my-8 text-center"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          我们的婚纱照
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage({ url: photo.url, alt: photo.alt })}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-auto object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                style={{ aspectRatio: "3/4" }}
              />
            </motion.div>
          ))}
        </div>

        <div ref={loaderRef} className="h-20 flex items-center justify-center my-8">
          {photos.length < weddingData.galleryPhotos.length && (
            <div className="animate-pulse text-gray-600">加载更多照片...</div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}