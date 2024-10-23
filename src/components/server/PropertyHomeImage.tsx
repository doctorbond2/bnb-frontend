import Image from 'next/image';

const ProxyImage = ({ imageUrl }: { imageUrl: string }) => {
  const proxyUrl = `/api/proxyImage?url=${encodeURIComponent(imageUrl)}`;

  return (
    <Image
      src={proxyUrl}
      alt="Dynamic Image"
      width={200}
      height={200}
      unoptimized
    />
  );
};
export default ProxyImage;
