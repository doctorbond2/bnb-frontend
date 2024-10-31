'use client';
import { useReducer, useEffect, useState } from 'react';
import { initialUpdatePropertyFormState as init } from '@/reducer/updatePropertyReducer';
import updatePropertyFormReducer from '@/reducer/updatePropertyReducer';
import ProxyImage from '@/components/server/ProxyImage';
import PropertyDates from '../property/PropertyDates';
import { UpdatePropertyFormActionType as ACTION } from '@/reducer/updatePropertyReducer';
import { UpdatePropertyFormData } from '@/models/interfaces/property';
import { useRouter } from 'next/navigation';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';

export default function PropertyUpdateForm({
  propertyId,
}: {
  propertyId: string;
}) {
  const { getProperty, user } = useStoreData();
  const { dispatch, handleDeleteProperty, handleUpdateProperty } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const property = getProperty(propertyId);

  const [state, updateForm] = useReducer(updatePropertyFormReducer, init);
  useEffect(() => {
    if (property) {
      updateForm({ type: ACTION.SET_NAME, payload: property.name });
      updateForm({ type: ACTION.SET_COUNTRY, payload: property.country });
      updateForm({ type: ACTION.SET_CITY, payload: property.city });
      updateForm({ type: ACTION.SET_ADDRESS, payload: property.address });
      updateForm({
        type: ACTION.SET_PRICE_PER_NIGHT,
        payload: property.price_per_night,
      });
      updateForm({ type: ACTION.SET_AVAILABLE, payload: property.available });
      updateForm({
        type: ACTION.SET_IMAGE_URLS,
        payload: property.images?.map((image) => image.url),
      });
      updateForm({
        type: ACTION.SET_AVAILABLE_FROM,
        payload: property.availableFrom,
      });
      updateForm({
        type: ACTION.SET_AVAILABLE_UNTIL,
        payload: property.availableUntil,
      });
    }
  }, [property]);

  const formatDateForDisplay = (
    dateString: string | null | undefined | Date
  ): string => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
    return '';
  };
  const submit = async () => {
    if (!property) {
      return;
    }
    updateForm({ type: ACTION.SET_ISSUBMITTING, payload: true });
    const updatedData: UpdatePropertyFormData = {
      name: state.name && state.name !== property.name ? state.name : undefined,
      country:
        state.country && state.country !== property.country
          ? state.country
          : undefined,
      city: state.city && state.city !== property.city ? state.city : undefined,
      address:
        state.address && state.address !== property.address
          ? state.address
          : undefined,
      price_per_night:
        state.price_per_night &&
        state.price_per_night !== property.price_per_night
          ? state.price_per_night
          : undefined,
      availableFrom: state.availableFrom || property.availableFrom,
      availableUntil: state.availableUntil || property.availableUntil,
      available: state.available,
    };

    const data = await handleUpdateProperty(updatedData, propertyId);
    if (data) {
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
      router.push(`/user/${user?.id}/profile/hostedProperties`);
    }
  };
  const handleDelete = async () => {
    if (!property) {
      return;
    }
    try {
      await handleDeleteProperty(propertyId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {property ? (
        <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await submit();
                }}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Property Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={state.name}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_NAME,
                        payload: e.target.value,
                      })
                    }
                    placeholder="Update Property Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label
                    htmlFor="country"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={state.country}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_COUNTRY,
                        payload: e.target.value,
                      })
                    }
                    placeholder="Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={state.city}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_CITY,
                        payload: e.target.value,
                      })
                    }
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={state.address}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_ADDRESS,
                        payload: e.target.value,
                      })
                    }
                    placeholder="Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label
                    htmlFor="price_per_night"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price per Night:
                  </label>

                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Price per night"
                    name="price_per_night"
                    type="text"
                    value={state.price_per_night}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_PRICE_PER_NIGHT,
                        payload: e.target.value.replace(/[^0-9]/g, ''),
                      })
                    }
                  />
                  <div id="current-dates">
                    <h3>Property currently available between:</h3>
                    <p>From: {formatDateForDisplay(state.availableFrom)}</p>
                    <p>Until: {formatDateForDisplay(state.availableUntil)}</p>
                  </div>
                  <div id="number-of-bookings">
                    {property?.bookings && (
                      <p>Number of bookings: {property.bookings.length}</p>
                    )}
                  </div>

                  {state.available && <PropertyDates dispatch={dispatch} />}

                  <label
                    htmlFor="available"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Available:
                  </label>
                  <input
                    type="checkbox"
                    id="available"
                    checked={state.available}
                    onChange={(e) =>
                      updateForm({
                        type: ACTION.SET_AVAILABLE,
                        payload: e.target.checked,
                      })
                    }
                    className="mr-2 leading-tight"
                  />
                </div>
                <div id="image-urls-showcase">
                  {state.imageUrls &&
                    state.imageUrls.map((url: string, index: number) => (
                      <div
                        key={url}
                        className="flex flex-row-reverse w-40 relative"
                      >
                        <button
                          className="w-[10%] bg-red-500 absolute top-0 right-0"
                          onClick={() => {
                            updateForm({
                              type: ACTION.REMOVE_IMAGE_URL,
                              payload: index,
                            });
                            console.log('test', index);
                          }}
                        >
                          X
                        </button>
                        <div>
                          <ProxyImage imageUrl={url} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-center">
                  <button
                    className="p-2 px-4 border-2 rounded-md hover:bg-green-400 w-[50%]"
                    type="submit"
                    disabled={state.isSubmitting}
                  >
                    {state.isSubmitting ? 'Updating...' : 'Update Property'}
                  </button>
                </div>
              </form>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (property?.bookings.length >= 1) {
                      alert(
                        'Cannot delete property with active bookings, Please cancel all bookings first'
                      );
                      return;
                    }
                    setIsModalOpen(true);
                  }}
                  className="p-2 px-4  rounded-md bg-red-500 hover:bg-black hover:text-red-500 w-[20%] mt-24"
                  type="button"
                  disabled={state.isSubmitting}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg relative">
                <button
                  onClick={async () => {
                    setIsModalOpen(false);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Cancel
                </button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
