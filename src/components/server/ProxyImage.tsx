import Image from 'next/image';
import { useState } from 'react';
const ProxyImage = ({ imageUrl }: { imageUrl: string }) => {
  const [src, setSrc] = useState(
    `/api/proxyImage?url=${encodeURIComponent(imageUrl)}`
  );

  const fallbackSrc = '/images/default-image.jpg'; // Path to your default image

  return (
    <Image
      src={src}
      alt="Dynamic Image"
      width={100}
      height={100}
      unoptimized
      onError={() => {
        console.log('Error loading image, switching to default.');
        setSrc(fallbackSrc);
      }}
    />
  );
};
export default ProxyImage;
