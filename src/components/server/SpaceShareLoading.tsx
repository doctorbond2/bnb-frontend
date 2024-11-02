import Image from 'next/image';
export default function SpaceShareLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/images/spaceshare_icon.png"
        width={40}
        height={40}
        alt="SpaceShare Icon"
        className="object-cover"
      />
      <h1 className="hidden md:block text-xl font-bold text-gray-700">
        Spaceshare
      </h1>
    </div>
  );
}
