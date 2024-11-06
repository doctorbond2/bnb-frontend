import { GetManyResponse, Property } from '@/models/interfaces/property';
import { sendServerRequest } from '@/lib/helpers/severFetch';
import HomePropertyList from '@/components/client/lists/HomePropertyList';
const getPropertyList = async () => {
  const response: GetManyResponse<Property> = await sendServerRequest({
    url: '/api/property',
    method: 'GET',
  });
  console.log('response:', response);
  return response;
};
export const dynamic = 'force-dynamic';
export default async function Home() {
  try {
    const response = await getPropertyList();
    const propertyList = response.data;
    if (!response) {
      return <div>Server Offline</div>;
    }
    return (
      <div>
        <div>
          <div id="hero">
            <div className="bg-cover bg-center h-96 flex items-center justify-center bg-blue-300">
              <h1 className="text-4xl text-white font-bold">
                Welcome to the best place to find your peace in Scandinavia
              </h1>
            </div>
          </div>
          <div className="md:px-10">
            <HomePropertyList propertyList={propertyList} />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return (
      <div className="flex justify-center h-screen w-full items-center">
        Server Is Down
      </div>
    );
  }
}
