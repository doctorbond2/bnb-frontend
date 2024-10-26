'use client';

export default function UserProfile({ userId }: { userId: string }) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}
