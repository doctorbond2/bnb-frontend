'use client';
import useStore from '@/lib/hooks/useStore';
import { useState } from 'react';
import { BookingFormData } from '@/models/interfaces/booking';
import { Customer } from '@/models/interfaces/booking';
import { useReducer } from 'react';
import bookingFormReducer from '@/reducer/bookingFormReducer';
import { initialBookingFormState } from '@/reducer/bookingFormReducer';
import { createBooking } from '@/redux/thunks/booking';
import { bookProperty } from '@/lib/handlers/booking';
import { BookingFormActionType as ACTION } from '@/reducer/bookingFormReducer';
import useStoreData from '@/lib/hooks/useStoreData';
import { validationHelper as validate } from '@/lib/helpers/validate';
export default function NewBookingForm({ propertyId }: { propertyId: string }) {
  const { dispatch } = useStore();
  const { user } = useStoreData();
  const formatDate = (date: Date | undefined): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };
  const [state, updateForm] = useReducer(
    bookingFormReducer,
    initialBookingFormState
  );

  return (
    <>
      {user && user.firstName}
      <form
        onSubmit={(e) => {
          bookProperty(e, dispatch, updateForm, propertyId, state);
        }}
      >
        FIRSTNAME
        <input
          type="text"
          value={state.firstName}
          onChange={(e) =>
            updateForm({ type: ACTION.SET_FIRSTNAME, payload: e.target.value })
          }
        />
        <br />
        LASTNAME
        <input
          type="text"
          value={state.lastName}
          onChange={(e) =>
            updateForm({ type: ACTION.SET_LASTNAME, payload: e.target.value })
          }
        />
        <br />
        MAIL
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            updateForm({ type: ACTION.SET_EMAIL, payload: e.target.value })
          }
        />
        <br />
        TELE
        <input
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="Phone Number"
          type="text"
          value={state.phoneNumber}
          onChange={(e) =>
            updateForm({
              type: ACTION.SET_PHONE,
              payload: e.target.value.replace(/[^0-9]/g, ''),
            })
          }
        />
        <br />
        STARTDATE
        <input
          type="date"
          value={formatDate(state.startDate)}
          onChange={(e) => {
            updateForm({
              type: ACTION.SET_STARTDATE,
              payload: new Date(e.target.value),
            });
            console.log(state.startDate);
          }}
        />
        <br />
        ENDDATE
        <input
          type="date"
          value={formatDate(state.endDate)}
          onChange={(e) => {
            updateForm({
              type: ACTION.SET_ENDDATE,
              payload: new Date(e.target.value),
            });
            console.log(state.endDate);
          }}
        />
        <br />
        <button type="submit" disabled={state.isSubmitting}>
          Book Property
        </button>
        {state.isSubmitting && <div>Booking in progress...</div>}
        {state.errors && (
          <div className="error">
            {Object.keys(state.errors).map((err: string) => {
              return <h2>{err}</h2>;
            })}
          </div>
        )}
      </form>
    </>
  );
}
