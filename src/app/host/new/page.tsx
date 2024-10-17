'use client';
import countries from '../../../lib/data/countries.json';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';
import { AppDispatch } from '@/redux/store';
import { PropertyFormData } from '@/models/interfaces/property';
import { createProperty } from '@/redux/thunks/property';
export default function Page() {
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
    const data: PropertyFormData = {
      name: e.currentTarget.property_name.value as string,
      country: e.currentTarget.country.value as string,
      city: e.currentTarget.city.value,
      availableFrom: new Date(
        e.currentTarget.availableFrom.value
      ).toISOString(),
      availableUntil: new Date(
        e.currentTarget.availableUntil.value
      ).toISOString(),
      address: e.currentTarget.address.value,
      hostId: user.id,
      price_per_night: parseInt(e.currentTarget.price_per_night.value, 10),
      available: true,
      //   images: [],
    };
    console.log(data);
    try {
      dispatch(createProperty({ data, dispatch }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
        />
        <br />
        CITY:
        <input type="text" name="city" placeholder="Enter city" required />
        <br />
        ADDRESS:
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          required
        />
        <br />
        COUNRY:
        <select required name="country">
          {countries.map((country: { name: string; code: string }) => (
            <option key={country.code}>{country.name}</option>
          ))}
        </select>
        <br />
        AVAILABLE FROM:
        <input type="date" name="availableFrom" required />
        <br />
        AVAILABLE TO:
        <input type="date" name="availableUntil" required />
        <br />
        <input
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="Price per night"
          name="price_per_night"
          type="text"
        />
        <br />
        ADDRESS:
        <button type="submit">Create property</button>
      </form>
    </>
  );
}
