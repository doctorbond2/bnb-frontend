import Link from 'next/link';
import { User } from '@/models/interfaces/user';

export default function SearchUserResult({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-11/12 h-full bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-full p-4">
          <Link href={`users/${user.id}`}>
            <h2 className="text-xl font-semibold">{user.firstName}</h2>{' '}
          </Link>
          {/* <p className="text-sm text-gray-500">{user.location}</p> */}
        </div>
      </div>
    </div>
  );
}
