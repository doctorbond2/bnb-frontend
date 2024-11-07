'use client';
import Image from 'next/image';
import { useReducer, useEffect, useState, useRef } from 'react';
import { initialUpdatePropertyFormState as init } from '@/reducer/updatePropertyReducer';
import { Cloudinary as IMAGE_STORAGE } from '@/lib/helpers/cloudinary';
import updatePropertyFormReducer from '@/reducer/updatePropertyReducer';
import { formatSentence } from '@/lib/helpers/convert';
import ProxyImage from '@/components/server/ProxyImage';
import GoBackButton from '../buttons/BackButton';
import PropertyDates from '../property/PropertyDates';
import { typeguard_isString as isString } from '@/lib/helpers/typeGuards';
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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, updateForm] = useReducer(updatePropertyFormReducer, init);
  const router = useRouter();

  const property = getProperty(propertyId);

  const checkIfFileIsInState = (file: File) => {
    return state.imageFiles.some((f) => f.name === file.name);
  };
  const addImageFile = async (file: File) => {
    if (file) {
      if (checkIfFileIsInState(file)) {
        console.error('File already exists in state:', file);
        alert('File already added');
        return;
      }
      updateForm({
        type: ACTION.SET_IMAGEFILES,
        payload: [file],
      });
      setSelectedImageFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setSelectedImageFile(null);
    }
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
        type: ACTION.PRESET_IMAGE_DISPLAY_LIST,
        payload: property.images?.map((image) => image.url) || [],
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
      available: state.available,
    };
    try {
      if (state.imageFiles.length > 0) {
        const secure_Urls = await IMAGE_STORAGE.uploadImages(state.imageFiles);
        updatedData.imageUrls = [...secure_Urls, ...state.imageUrls];
      } else {
        updatedData.imageUrls = state.imageUrls;
      }

      const data = await handleUpdateProperty(updatedData, propertyId);
      if (data) {
        updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
        router.push(`/user/${user?.id}/profile/hostedProperties`);
      }
    } catch (err) {
      console.log(err);
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
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
      <GoBackButton />
      {property ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
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
                <label
                  htmlFor="price_per_night"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Price per Night:
                </label>
                <input
                  className="w-[20%] px-4 py-2 border border-gray-300 rounded-lg"
                  pattern="[0-9]*"
                  maxLength={4}
                  inputMode="numeric"
                  placeholder="€"
                  name="price_per_night"
                  type="text"
                  value={state.price_per_night || ''}
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

              <div className="flex flex-wrap w-full">
                <label htmlFor="add-image" className="font-semibold mr-8">
                  New Image:
                </label>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setSelectedImageFile(files[0]);
                    } else {
                      setSelectedImageFile(null);
                    }
                  }}
                />

                <button
                  className={`${
                    inputRef.current?.files?.length === 0
                      ? 'bg-gray-300 cursor-default'
                      : 'bg-blue-500 hover:bg-indigo-600 cursor-pointer'
                  } text-white px-4 py-2 rounded `}
                  type="button"
                  disabled={inputRef.current?.files?.length === 0}
                  onClick={() => {
                    if (selectedImageFile) {
                      addImageFile(selectedImageFile);
                    }
                  }}
                >
                  Add image
                </button>
              </div>

              <div
                id="image-urls-showcase"
                className="flex flex-wrap border-2 rounded-lg p-2"
              >
                {state.imageDisplayList &&
                  state.imageDisplayList.map(
                    (item: string | File, index: number) => {
                      if (isString(item)) {
                        return (
                          <div
                            key={item + '-' + index}
                            className="relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden"
                          >
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute top-0 left-0"
                              type="button"
                              onClick={() => {
                                updateForm({
                                  type: ACTION.REMOVE_IMAGE,
                                  payload: index,
                                });
                              }}
                            >
                              X
                            </button>
                            <ProxyImage imageUrl={item} />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={item.name + '-' + index}
                            className="relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden"
                          >
                            <button
                              onClick={() => {
                                updateForm({
                                  type: ACTION.REMOVE_IMAGE,
                                  payload: index,
                                });
                              }}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute top-0 left-0"
                            >
                              X
                            </button>
                            <Image
                              src={URL.createObjectURL(item)}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="rounded-md object-cover"
                            />
                          </div>
                        );
                      }
                    }
                  )}
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
