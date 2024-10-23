import Image from 'next/image';

const ProxyImage = ({ imageUrl }: { imageUrl: string }) => {
  const proxyUrl = `/api/proxyImage?url=${encodeURIComponent(imageUrl)}`;

  return (
    <Image
      src={proxyUrl}
      alt="Dynamic Image"
      width={100}
      height={100}
      unoptimized
    />
  );
};
export default ProxyImage;
