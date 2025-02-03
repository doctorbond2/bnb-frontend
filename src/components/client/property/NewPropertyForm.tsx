'use client';
import countries from '../../../lib/data/countries.json';
import Image from 'next/image';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { AppDispatch } from '@/redux/store';
import { PropertyFormData } from '@/models/interfaces/property';
import { createProperty } from '@/redux/thunks/property';
import { useState, useRef } from 'react';
import { Cloudinary as IMAGE_UPLOAD } from '@/lib/helpers/cloudinary';
import newPropertyFormReducer from '@/reducer/newPropertyReducer';
import {
  convertFirstCharToUpperCase as firstToUpper,
  formatSentence,
} from '@/lib/helpers/convert';
import { removeNumbers } from '@/lib/helpers/regex';
import { useRouter } from 'next/navigation';
import PropertyDates from './PropertyDates';
import {
  initialNewPropertyFormState as init,
  NewPropertyActionType as ACTION,
} from '@/reducer/newPropertyReducer';
import { useReducer } from 'react';
import { validationHelper } from '@/lib/helpers/validate';

export default function NewPropertyForm() {
  const [state, updateForm] = useReducer(newPropertyFormReducer, {
    ...init,
    country: 'Sweden',
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { user } = useStoreData();
  const { dispatch } = useStore();

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

      setImagePreviews((prev) => [...prev, URL.createObjectURL(file)]);

      setSelectedImageFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ACTION
  ) => {
    const cleanedValue = firstToUpper(removeNumbers(e.target.value));
    updateForm({
      type,
      payload: cleanedValue,
    });
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
      description:
        formatSentence(state.description) ||
        `A beautiful home in ${state.city}, ${state.country}`,
      available: true,
      hostId: user.id,
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
      const secure_urls = await IMAGE_UPLOAD.uploadImages(state.imageFiles);
      formData.imageUrls = secure_urls;

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
              Property Name
              <input
                type="text"
                value={firstToUpper(state.name)}
                name="property_name"
                placeholder="Enter property name"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  handleInput(e, ACTION.SET_NAME);
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              City
              <input
                type="text"
                value={firstToUpper(state.city)}
                name="city"
                placeholder="Enter city"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_CITY,
                    payload: firstToUpper(e.currentTarget.value),
                  });
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Address
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={firstToUpper(state.address)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_ADDRESS,
                    payload: firstToUpper(e.currentTarget.value),
                  });
                }}
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Country
              <select
                required
                name="country"
                value={state.country}
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
            <label
              htmlFor="description"
              className="font-semibold block text-gray-700"
            >
              Describe your property
            </label>
            <textarea
              id="description"
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

            <label className="block text-gray-700 font-semibold">
              Price Per Night:
              <input
                pattern="[0-9]*"
                maxLength={4}
                inputMode="numeric"
                placeholder="Price per night in EUR"
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
            <label htmlFor="add-image" className="font-semibold mr-8">
              Add image
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
              } text-white px-4 py-2 rounded  `}
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
            <div
              id="images-showcase"
              className=" mt-6 flex flex-wrap bg-blue-100 items-start p-4 rounded-md gap-4"
            >
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      updateForm({
                        type: ACTION.REMOVE_IMAGE_FILE,
                        payload: index,
                      });
                      setImagePreviews((prev) =>
                        prev.filter((_, i) => i !== index)
                      ); // Remove preview
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute top-0 left-0"
                  >
                    X
                  </button>
                  <Image
                    src={preview}
                    alt={`Preview ${index}`}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded mt-4 hover:bg-indigo-600"
            >
              Create property
            </button>
          </form>
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
