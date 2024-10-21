'use client';
import useStore from '@/lib/hooks/useStore';
import { useReducer } from 'react';
import bookingFormReducer from '@/reducer/bookingFormReducer';
import DatePicker from './DatePicker';
import { initialBookingFormState } from '@/reducer/bookingFormReducer';
import { bookProperty } from '@/lib/handlers/booking';
import { BookingFormActionType as ACTION } from '@/reducer/bookingFormReducer';
import useStoreData from '@/lib/hooks/useStoreData';
import { Property } from '@/models/interfaces/property';
export default function NewBookingForm({
  propertyId,
  property,
}: {
  propertyId: string;
  property: Property;
}) {
  const { dispatch } = useStore();
  const { user } = useStoreData();
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
    return <div>Property not found</div>;
  }
  return (
    <>
      {user && user.firstName && property.id}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="block text-gray-700 font-medium mb-2">
            <form
              onSubmit={(e) => {
                bookProperty(e, dispatch, updateForm, propertyId, state);
              }}
              className="space-y-4"
            >
              <label
                htmlFor="firstname"
                className="block text-gray-700 font-medium mb-2"
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
              />
              <label
                htmlFor="lastname"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                value={state.lastName}
                onChange={(e) =>
                  updateForm({
                    type: ACTION.SET_LASTNAME,
                    payload: e.target.value,
                  })
                }
              />
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                value={state.email}
                onChange={(e) =>
                  updateForm({
                    type: ACTION.SET_EMAIL,
                    payload: e.target.value,
                  })
                }
              />
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Phone Number"
                name="phoneNumber"
                type="text"
                value={state.phoneNumber}
                onChange={(e) =>
                  updateForm({
                    type: ACTION.SET_PHONE,
                    payload: e.target.value.replace(/[^0-9]/g, ''),
                  })
                }
              />
              {property && (
                <DatePicker
                  bookings={property.bookings}
                  availableFrom={formatDate(property.availableFrom)}
                  availableUntil={formatDate(property.availableUntil)}
                  dispatch={updateForm}
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={state.isSubmitting}
              >
                Book Property
              </button>
              {state.isSubmitting && <div>Booking in progress...</div>}
              {state.errors && (
                <div className="error">
                  {Object.keys(state.errors).map(
                    (err: string, index: number) => {
                      return <h2 key={'error' + index}>{err}</h2>;
                    }
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
