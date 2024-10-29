import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="hidden md:block w-64 bg-white p-4 shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <Link
            href="/admin/bookings"
            className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Bookings
          </Link>
          <Link
            href="/admin/properties"
            className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Properties
          </Link>
          <Link
            href="/admin/users"
            className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Top Navigation for small screens */}
      <div className="md:hidden bg-white shadow-md">
        <nav className="flex space-x-4 p-4">
          <Link
            href="/admin/bookings"
            className="text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Bookings
          </Link>
          <Link
            href="/admin/properties"
            className="text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Properties
          </Link>
          <Link
            href="/admin/users"
            className="text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Users
          </Link>
        </nav>
      </div>

      <main className="flex-1 p-6">
        <div className="bg-white p-4 rounded-md shadow-md">{children}</div>
      </main>
    </div>
  );
}
