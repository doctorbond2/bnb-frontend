'use client';

export default function FooterLayout() {
  return (
    <footer className="bg-blue-300 text-white py-4 min-h-52">
      <div className="container mx-auto text-center flex flex-col justify-center">
        <p className="text-lg">
          © {new Date().getFullYear()} Spaceshare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
