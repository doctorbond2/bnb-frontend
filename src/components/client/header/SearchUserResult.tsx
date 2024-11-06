import { User } from '@/models/interfaces/user';

export default function SearchUserResult({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-11/12 h-full bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-full p-4">
          <h2 className="text-xl font-semibold">{user.firstName}</h2>
        </div>
      </div>
    </div>
  );
}
