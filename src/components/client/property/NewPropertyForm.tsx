'use client';
import countries from '../../../lib/data/countries.json';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { AppDispatch } from '@/redux/store';
import { PropertyFormData } from '@/models/interfaces/property';
import { createProperty } from '@/redux/thunks/property';
import newPropertyFormReducer from '@/reducer/newPropertyReducer';
import Image from 'next/image';
import PropertyDates from './PropertyDates';
import {
  initialNewPropertyFormState as init,
  NewPropertyActionType as ACTION,
} from '@/reducer/newPropertyReducer';
import { useReducer } from 'react';
import { validationHelper } from '@/lib/helpers/validate';

export default function NewPropertyForm() {
  const [state, updateForm] = useReducer(newPropertyFormReducer, init);

  const { user } = useStoreData();
  const { dispatch } = useStore();
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
      imageFiles: state.imageFiles,
    };
    console.log('form data: ', formData);
    const [hasErrors, errors] = validationHelper.validatePropertyForm(formData);
    if (hasErrors) {
      console.log('errrors: ', errors);
      updateForm({ type: ACTION.SET_ERRORS, payload: errors });
      return;
    }
    try {
      dispatch(createProperty({ data: formData, dispatch }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <form
            onSubmit={(e) => {
              create(e, dispatch);
            }}
          >
            PROPERTY NAME:
            <input
              type="text"
              name="property_name"
              placeholder="Enter property name"
              required
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_NAME,
                  payload: e.currentTarget.value,
                });
              }}
            />
            <br />
            CITY:
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              required
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_CITY,
                  payload: e.currentTarget.value,
                });
              }}
            />
            <br />
            ADDRESS:
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              required
              onChange={(e) => {
                updateForm({
                  type: ACTION.SET_ADDRESS,
                  payload: e.currentTarget.value,
                });
              }}
            />
            <br />
            COUNRY:
            <select
              required
              name="country"
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
            <br />
            <PropertyDates dispatch={updateForm} />
            <br />
            <input
              type="file"
              name="property_images"
              multiple
              accept="image/*" // Only accept image files
              onChange={(e) => {
                console.log(e.target.files);
                const files = Array.from(e.target.files || []); // Convert FileList to an array
                updateForm({ type: ACTION.SET_IMAGEFILES, payload: files }); // Update the state with selected files
                console.log(state.imageFiles);
              }}
            />
            PRICE PER NIGHT:
            <br />
            <input
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
            <div id="files-showcase">
              {state.imageFiles.map((file: File, index: number) => (
                <div
                  key={file.name}
                  className="flex flex-col-reverse w-20 relative"
                >
                  <button
                    className="w-[25%] absolute top-0 right-0"
                    onClick={() =>
                      updateForm({
                        type: ACTION.REMOVE_IMAGEFILE,
                        payload: index,
                      })
                    }
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    X
                  </button>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width="100"
                    height="100"
                  />
                </div>
              ))}
            </div>
            <button type="submit">Create property</button>
          </form>
        </div>
      </div>
    </>
  );
}
