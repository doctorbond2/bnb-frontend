'use client';
import { Image as ImageType } from '@/models/interfaces/general';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PropertyImageShowcase({
  images,
}: {
  images: ImageType[];
}) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      console.log('Setting selected image', selectedImage);
      setSelectedImage(images[0]);
    }
    console.log('Setting new selected image', selectedImage);
  }, [images, selectedImage]);
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="h-80 w-full  border-gray-700 mb-2 flex items-center justify-center">
        {selectedImage && (
          <div className="relative h-full w-full">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              layout="fill"
              className="object-cover rounded-md"
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 border-2 rounded-md bg-blue-100">
        {images.map((image) => (
          <div
            key={image.alt}
            className={`h-32 w-32 cursor-pointer ${
              selectedImage !== image
                ? 'hover:border-2 hover:border-blue-500'
                : 'border-2 border-blue-500'
            }`}
            onClick={() => {
              setSelectedImage(image);
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                className="object-cover rounded-md"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
