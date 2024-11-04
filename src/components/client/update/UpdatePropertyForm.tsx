'use client';
import { useReducer, useEffect, useState } from 'react';
import { initialUpdatePropertyFormState as init } from '@/reducer/updatePropertyReducer';
import updatePropertyFormReducer from '@/reducer/updatePropertyReducer';
import { formatSentence } from '@/lib/helpers/convert';
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
  const [imageUrlInput, setImageUrlInput] = useState('');

  const router = useRouter();

  const property = getProperty(propertyId);

  const [state, updateForm] = useReducer(updatePropertyFormReducer, init);
  const addImageUrl = () => {
    if (imageUrlInput) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[^\s]*)?$/;

      if (urlRegex.test(imageUrlInput)) {
        updateForm({
          type: ACTION.SET_IMAGE_URLS,
          payload: [imageUrlInput],
        });
        setImageUrlInput('');
      } else {
        console.error('Invalid URL format:', imageUrlInput);
        alert('Please enter a valid URL.');
      }
    }
  };
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };
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
        type: ACTION.SET_DESCRIPTION,
        payload: property.description,
      });
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
      description:
        state.description && state.description !== property.description
          ? formatSentence(state.description)
          : undefined,
      availableFrom: state.availableFrom || property.availableFrom,
      availableUntil: state.availableUntil || property.availableUntil,
      imageUrls: state.imageUrls,
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
      router.push(`/user/${user?.id}/profile/hostedProperties`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="bg-white  px-4 py-3 border-2 rounded-md hover:bg-gray-200"
        onClick={() => {
          router.back();
        }}
      >
        {' '}
        Go back
      </button>
      {property ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                await submit();
              }}
            >
              <div className="space-y-2">
                <div className="space-y-2">
                  {[
                    {
                      id: 'name',
                      value: state.name,
                      label: 'Property Name',
                      type: 'text',
                      action: ACTION.SET_NAME,
                      placeholder: 'Update Property Name',
                      className:
                        'w-full px-4 py-2 border border-gray-300 rounded-lg',
                    },
                    {
                      id: 'country',
                      value: state.country,
                      label: 'Country',
                      type: 'text',
                      action: ACTION.SET_COUNTRY,
                      placeholder: 'Country',
                      className:
                        'w-full px-4 py-2 border border-gray-300 rounded-lg',
                    },
                    {
                      id: 'city',
                      value: state.city,
                      label: 'City',
                      type: 'text',
                      action: ACTION.SET_CITY,
                      placeholder: 'City',
                      className:
                        'w-full px-4 py-2 border border-gray-300 rounded-lg',
                    },
                    {
                      id: 'address',
                      value: state.address,
                      label: 'Address',
                      type: 'text',
                      action: ACTION.SET_ADDRESS,
                      placeholder: 'Address',
                      className:
                        'w-full px-4 py-2 border border-gray-300 rounded-lg',
                    },
                  ].map(
                    ({
                      value,
                      label,
                      type = 'text',
                      action,
                      placeholder,
                      id,
                      className,
                    }) => (
                      <div key={id}>
                        <label htmlFor={id}>{label}</label>
                        <input
                          className={className}
                          placeholder={placeholder}
                          type={type}
                          value={value}
                          onChange={(e) =>
                            updateForm({
                              type: action,
                              payload: e.target.value,
                            })
                          }
                        />
                      </div>
                    )
                  )}
                </div>

                <label
                  htmlFor="price_per_night"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Price per Night:
                </label>

                <label
                  htmlFor="description"
                  className="font-semibold block text-gray-700"
                >
                  Describe your property
                </label>
                <textarea
                  id="description"
                  value={state.description}
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Number of rooms, amenities, etc."
                  onChange={(e) => {
                    updateForm({
                      type: ACTION.SET_DESCRIPTION,
                      payload: e.currentTarget.value,
                    });
                  }}
                />
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
                      payload: parseInt(
                        e.target.value.replace(/[^0-9]/g, ''),
                        10
                      ),
                    })
                  }
                />
                <div
                  id="current-dates"
                  className="flex flex-col border-2 border-gray-200"
                >
                  <h3 className="font-bold text-lg text-center">
                    Property currently available between:
                  </h3>
                  <p className="py-2 text-center">
                    From: {formatDateForDisplay(state.availableFrom)}
                  </p>
                  <p className="py-2 text-center">
                    Until: {formatDateForDisplay(state.availableUntil)}
                  </p>
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
              <label className="block text-gray-700 font-semibold">
                Image URL:
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    name="property_images"
                    placeholder="Image URL"
                    value={imageUrlInput}
                    className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={handleImageUrlChange}
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
              </label>
              <div
                id="image-urls-showcase"
                className="flex flex-wrap border-2 rounded-lg p-2"
              >
                {state.imageUrls &&
                  state.imageUrls.map((url: string, index: number) => (
                    <div
                      key={url + '-' + index}
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
        <div> Loading Property...</div>
      )}
    </>
  );
}
