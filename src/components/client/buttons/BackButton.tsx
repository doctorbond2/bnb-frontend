'use client';
import { useRouter } from 'next/navigation';
export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-white  px-4 py-3 border-2 rounded-md hover:bg-gray-200"
      onClick={() => {
        router.back();
      }}
    >
      {' '}
      Go back
    </button>
  );
}
