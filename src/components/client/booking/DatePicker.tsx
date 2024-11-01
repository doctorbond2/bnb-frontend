import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Dispatch } from 'react';
import { Booking } from '@/models/interfaces/booking';
import {
  BookingFormAction as Action,
  BookingFormActionType as TYPE,
} from '@/reducer/bookingFormReducer';

interface BookingDate {
  startDate: string;
  endDate: string;
}

interface DatePickerProps {
  availableFrom: string;
  availableUntil: string;
  bookings: BookingDate[] | Booking[];
  dispatch: Dispatch<Action>;
}

function DatePicker({
  bookings,
  availableFrom,
  availableUntil,
  dispatch,
}: DatePickerProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const disabledRanges = bookings.map((booking) => ({
    from: new Date(booking.startDate),
    to: new Date(booking.endDate),
  }));
  console.log('disabled.', disabledRanges);
  const formatDate = (date: Date | undefined): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    }
    return '';
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">
        Select a Start Date
      </h2>
      <Flatpickr
        value={selectedStartDate as Date}
        onChange={(selectedDates) => {
          setSelectedStartDate(selectedDates[0]);
          dispatch({
            type: TYPE.SET_STARTDATE,
            payload: formatDate(selectedDates[0]),
          });
          setSelectedEndDate(null);
        }}
        options={{
          dateFormat: 'Y-m-d',
          minDate: availableFrom,
          maxDate: availableUntil,
          disable: disabledRanges,
        }}
        name="startDate"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {selectedStartDate && (
        <p className="text-gray-600 mt-2">
          Selected Start Date:{' '}
          <span className="font-medium text-gray-800">
            {selectedStartDate.toLocaleDateString()}
          </span>
        </p>
      )}

      <h2 className="text-lg font-semibold text-gray-700">
        Select an End Date
      </h2>
      <Flatpickr
        value={selectedEndDate as Date}
        onChange={(selectedDates) => {
          if (selectedStartDate && selectedDates[0] < selectedStartDate) {
            alert('End date cannot be before start date.');
            return;
          }
          dispatch({
            type: TYPE.SET_ENDDATE,
            payload: formatDate(selectedDates[0]),
          });
          setSelectedEndDate(selectedDates[0]);
        }}
        options={{
          dateFormat: 'Y-m-d',
          minDate: selectedStartDate ? selectedStartDate : availableFrom,
          maxDate: availableUntil,
          disable: disabledRanges,
        }}
        name="endDate"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {selectedEndDate && (
        <p className="text-gray-600 mt-2">
          Selected End Date:{' '}
          <span className="font-medium text-gray-800">
            {selectedEndDate.toLocaleDateString()}
          </span>
        </p>
      )}
    </div>
  );
}

export default DatePicker;
