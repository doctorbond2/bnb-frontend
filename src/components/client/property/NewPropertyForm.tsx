'use client';
import countries from '../../../lib/data/countries.json';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { AppDispatch } from '@/redux/store';
import { PropertyFormData } from '@/models/interfaces/property';
import { createProperty } from '@/redux/thunks/property';
import { useState } from 'react';
import ProxyImage from '@/components/server/ProxyImage';
import newPropertyFormReducer from '@/reducer/newPropertyReducer';
import { useRouter } from 'next/navigation';
import PropertyDates from './PropertyDates';
import {
  initialNewPropertyFormState as init,
  NewPropertyActionType as ACTION,
} from '@/reducer/newPropertyReducer';
import { useReducer } from 'react';
import { validationHelper } from '@/lib/helpers/validate';

export default function NewPropertyForm() {
  const [state, updateForm] = useReducer(newPropertyFormReducer, init);
  const router = useRouter();
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user } = useStoreData();
  const { dispatch } = useStore();
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };

  const addImageUrl = () => {
    if (imageUrlInput) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[^\s]*)?$/;
      if (urlRegex.test(imageUrlInput)) {
        console.log('adding image url: ', imageUrlInput);
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

  const create = async (
    e: React.FormEvent<HTMLFormElement>,
    dispatch: AppDispatch
  ) => {
    e.preventDefault();
    if (!user.id) {
      return;
    }
    const formData: PropertyFormData = {
      name: state.name,
      country: state.country,
      city: state.city,
      address: state.address,
      price_per_night: parseInt(state.price_per_night as unknown as string),
      availableFrom: state.availableFrom,
      availableUntil: state.availableUntil,
      available: true,
      hostId: user.id,
      imageUrls: state.imageUrls || [],
    };
    const [hasErrors, errors] = validationHelper.validatePropertyForm(formData);
    if (hasErrors) {
      updateForm({ type: ACTION.SET_ERRORS, payload: errors });
      setShowModal(true);
      return;
    }
    setShowModal(true);
    updateForm({ type: ACTION.SET_ISSUBMITTING, payload: true });
    try {
      await dispatch(createProperty({ data: formData, dispatch }));
      updateForm({ type: ACTION.RESET_FORM });
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full space-y-4">
          <form
            onSubmit={(e) => {
              create(e, dispatch);
            }}
            className="space-y-4"
          >
            <label className="block text-gray-700 font-semibold">
              Property Name:
              <input
                type="text"
                name="property_name"
                placeholder="Enter property name"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_NAME,
                    payload: e.currentTarget.value,
                  });
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              City:
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_CITY,
                    payload: e.currentTarget.value,
                  });
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Address:
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_ADDRESS,
                    payload: e.currentTarget.value,
                  });
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Country:
              <select
                required
                name="country"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_COUNTRY,
                    payload: e.currentTarget.value,
                  });
                }}
              >
                {countries.map((country: { name: string; code: string }) => (
                  <option key={country.code}>{country.name}</option>
                ))}
              </select>
            </label>

            <div className="mt-4">
              <PropertyDates dispatch={updateForm} />
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

            <label className="block text-gray-700 font-semibold">
              Price Per Night:
              <input
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Price per night"
                name="price_per_night"
                type="text"
                value={state.price_per_night}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  updateForm({
                    type: ACTION.SET_PRICE_PER_NIGHT,
                    payload: e.target.value.replace(/[^0-9]/g, ''),
                  })
                }
              />
            </label>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded mt-4 hover:bg-indigo-600"
            >
              Create property
            </button>
          </form>

          <div id="image-urls-showcase" className="space-y-4 mt-6">
            {state.imageUrls.map((url: string, index: number) => (
              <div key={url} className="flex items-center space-x-2 w-full">
                <button
                  onClick={() => {
                    updateForm({
                      type: ACTION.REMOVE_IMAGE_URL,
                      payload: index,
                    });
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  X
                </button>
                <div className="flex-grow">
                  <ProxyImage imageUrl={url} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal &&
      !state.isSubmitting &&
      !state.submitError &&
      Object.keys(state.errors).length <= 0 ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Success! Property Created.
            </h3>

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setShowModal(false);
                  router.push(`/user/${user.id}/profile/hostedProperties`);
                }}
              >
                View your properties
              </button>
            </div>
          </div>
        </div>
      ) : showModal && state.isSubmitting ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Creating Property...</h3>
          </div>
        </div>
      ) : showModal && Object.keys(state.errors).length > 0 ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Error Creating Property
            </h3>
            <ul className="list-inside list-none">
              {Object.keys(state.errors).map((error) => (
                <li key={error}>{state.errors[error]}</li>
              ))}
            </ul>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : showModal && state.submitError ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Error Creating Property
            </h3>
            <p className="text-red-500">{state.submitError}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
