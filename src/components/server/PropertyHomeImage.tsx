'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Image as ImageProps } from '@/models/interfaces/general';
const ProxyImage = ({ image }: { image: ImageProps }) => {
  const [src, setSrc] = useState(
    `/api/proxyImage?url=${encodeURIComponent(image.url)}`
  );

  const fallbackSrc = './images/No_Photo_Available.jpg';

  return (
    <div className="w-full h-full relative">
      <Image
        src={src}
        alt={image.alt}
        fill
        className="object-cover"
        unoptimized
        onError={() => {
          console.log('Error loading image, switching to default.');
          setSrc(fallbackSrc);
        }}
      />
    </div>
  );
};

export default ProxyImage;
