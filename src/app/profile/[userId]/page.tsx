import { sendServerRequest } from '@/lib/helpers/severFetch';
import { User } from '@/models/interfaces/user';
import ProxyImage from '@/components/server/PropertyHomeImage';
import Image from 'next/image';
const getUser = async (userId: string) => {
  const response: User = await sendServerRequest({
    url: `/api/users/:id`,
    method: 'GET',
    id: userId,
  });
  return response;
};

export default async function Page({ params }: { params: { userId: string } }) {
  try {
    const user: User = await getUser(params.userId);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            No. listed homes: {user.hosted_properties?.length || 0}
          </p>

          <ul className="space-y-4">
            {user.hosted_properties?.map((property, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="min-h-52">
                  <div className="h-36 w-36">
                    {property.images && property.images.length > 0 ? (
                      <ProxyImage image={property.images[0]} />
                    ) : (
                      <div className="w-full h-full relative border-2 border-gray-500 rounded-sm">
                        <Image
                          src="/images/No_Photo_Available.jpg"
                          alt={'No Photo Available'}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {property.name}
                  </h2>
                  <p className="text-gray-500">{property.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading user data
      </div>
    );
  }
}
