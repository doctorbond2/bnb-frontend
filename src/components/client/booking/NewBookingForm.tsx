'use client';
import useStore from '@/lib/hooks/useStore';
import { useReducer } from 'react';
import bookingFormReducer, {
  initialBookingFormState,
} from '@/reducer/bookingFormReducer';
import DatePicker from './DatePicker';
import { bookProperty } from '@/lib/handlers/booking';
import { BookingFormActionType as ACTION } from '@/reducer/bookingFormReducer';
import { Property } from '@/models/interfaces/property';

export default function NewBookingForm({
  propertyId,
  property,
}: {
  propertyId: string;
  property: Property;
}) {
  const { dispatch } = useStore();

  const formatDate = (dateString: Date): string => {
    if (dateString) {
      const date = new Date(dateString);
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }
    return '';
  };

  const [state, updateForm] = useReducer(
    bookingFormReducer,
    initialBookingFormState
  );

  if (!property || !property.availableFrom || !property.availableUntil) {
    return <div className="text-center text-gray-500">Property not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Book Your Stay
        </h2>

        <form
          onSubmit={(e) =>
            bookProperty(e, dispatch, updateForm, propertyId, state)
          }
          className="space-y-6"
        >
          <label
            htmlFor="firstname"
            className="block text-gray-700 font-semibold"
          >
            First Name:
          </label>
          <input
            type="text"
            value={state.firstName}
            onChange={(e) =>
              updateForm({
                type: ACTION.SET_FIRSTNAME,
                payload: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label
            htmlFor="lastname"
            className="block text-gray-700 font-semibold"
          >
            Last Name:
          </label>
          <input
            type="text"
            value={state.lastName}
            onChange={(e) =>
              updateForm({ type: ACTION.SET_LASTNAME, payload: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email:
          </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              updateForm({ type: ACTION.SET_EMAIL, payload: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold"
          >
            Phone Number:
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number"
            value={state.phoneNumber}
            onChange={(e) =>
              updateForm({
                type: ACTION.SET_PHONE,
                payload: e.target.value.replace(/[^0-9]/g, ''),
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {property && (
            <DatePicker
              bookings={property.bookings}
              availableFrom={formatDate(property.availableFrom as Date)}
              availableUntil={formatDate(property.availableUntil as Date)}
              dispatch={updateForm}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? 'Booking...' : 'Book Property'}
          </button>

          {state.errors && (
            <div className="mt-4 text-red-600">
              {Object.values(state.errors).map((error, index) => (
                <p key={index} className="text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
