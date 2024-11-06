'use client';
import { Image } from '@/models/interfaces/general';
import { useState } from 'react';
import CustomImage from '@/components/server/PropertyHomeImage';

export default function PropertyImageShowcase({ images }: { images: Image[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="h-80 w-full border-2 rounded-md border-gray-700 mb-2">
        <CustomImage image={selectedImage} />
      </div>

      <div className="flex gap-2 border-2 rounded-md bg-blue-100">
        {images.map((image) => (
          <div
            key={image.alt}
            className={`h-32 w-32 cursor-pointer ${
              selectedImage !== image &&
              '*:hover:border-2 *:hover:border-blue-500 '
            } ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
            onClick={() => {
              if (selectedImage !== image) setSelectedImage(image);
            }}
          >
            <CustomImage image={image} />
          </div>
        ))}
      </div>
    </div>
  );
}
