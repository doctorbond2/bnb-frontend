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
    from: booking.startDate,
    to: booking.endDate,
  }));
  const formatDate = (date: Date | undefined): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    }
    return '';
  };

  return (
    <div>
      <h2>Select a start date</h2>
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
      />
      {selectedStartDate && (
        <p>
          Selected Start Date:{' '}
          {selectedStartDate instanceof Date
            ? selectedStartDate.toLocaleDateString()
            : selectedStartDate}
        </p>
      )}

      <h2>Select an end date</h2>
      <Flatpickr
        value={selectedEndDate as Date}
        onChange={(selectedDates) => {
          if (selectedStartDate && selectedDates[0] < selectedStartDate) {
            alert('End date cannot be before start date.');
            return;
          }
          console.log('selectedDates', formatDate(selectedDates[0]));
          dispatch({
            type: TYPE.SET_ENDDATE,
            payload: formatDate(selectedDates[0]),
          });
          console.log('selected; ', selectedDates[0]);
          setSelectedEndDate(selectedDates[0]);
        }}
        options={{
          dateFormat: 'Y-m-d',
          minDate: selectedStartDate ? selectedStartDate : availableFrom,
          maxDate: availableUntil,
          disable: disabledRanges,
        }}
        name="endDate"
      />
      {selectedEndDate && (
        <p>
          Selected End Date:{' '}
          {selectedEndDate instanceof Date
            ? selectedEndDate.toLocaleDateString()
            : selectedEndDate}
        </p>
      )}
    </div>
  );
}

export default DatePicker;
