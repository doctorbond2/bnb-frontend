'use client';
import { useReducer, useEffect, useState } from 'react';
import updatePropertyFormReducer from '@/reducer/updatePropertyReducer';
import PropertyDates from '../property/PropertyDates';
import { useRouter } from 'next/navigation';
import {
  UpdatePropertyFormState,
  UpdatePropertyFormActionType as ACTION,
} from '@/reducer/updatePropertyReducer';

import { updateProperty } from '@/redux/thunks/property';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';

export default function PropertyUpdateForm({
  propertyId,
}: {
  propertyId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getProperty } = useStoreData();
  const { dispatch } = useStore();
  const router = useRouter();
  const property = getProperty(propertyId);
  if (!property) {
    router.push('/404');
    return null;
  }
  const property_imageUrls =
    property.images?.map((image, index) => {
      return image.url;
    }) || [];
  const init: UpdatePropertyFormState = {
    name: '',
    country: '',
    city: '',
    address: '',
    price_per_night: '',
    availableFrom: null,
    availableUntil: null,
    available: false,
    hostId: '',
    imageUrls: [],
    isSubmitting: false,
    errors: {},
  };

  const [state, updateForm] = useReducer(updatePropertyFormReducer, init);

  const submit = async () => {
    updateForm({ type: ACTION.SET_ISSUBMITTING, payload: true });
    const updatedData = {
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
      hostId: state.hostId || property.hostId,
    };
    const data = await dispatch(
      updateProperty({ data: updatedData, dispatch })
    );
    if (data) {
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
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
        payload: String(property.price_per_night),
      });
      updateForm({
        type: ACTION.SET_AVAILABLE_FROM,
        payload: property.availableFrom,
      });
      updateForm({
        type: ACTION.SET_AVAILABLE_UNTIL,
        payload: property.availableUntil,
      });
      updateForm({ type: ACTION.SET_AVAILABLE, payload: property.available });
      updateForm({ type: ACTION.SET_HOST_ID, payload: property.hostId });
      updateForm({
        type: ACTION.SET_IMAGE_URLS,
        payload: property_imageUrls,
      });
    }
  }, [property]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
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
                  updateForm({ type: ACTION.SET_NAME, payload: e.target.value })
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
                  updateForm({ type: ACTION.SET_CITY, payload: e.target.value })
                }
                placeholder="City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label
                htmlFor="price_per_night"
                className="block text-gray-700 font-medium mb-2"
              >
                Price per Night:
              </label>
              <input
                type="number"
                id="price_per_night"
                value={state.price_per_night}
                onChange={(e) =>
                  updateForm({
                    type: ACTION.SET_PRICE_PER_NIGHT,
                    payload: e.target.value,
                  })
                }
                placeholder="Price per Night"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
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
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
