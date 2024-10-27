import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Dispatch } from 'react';
import {
  NewPropertyAction as Action,
  NewPropertyActionType as TYPE,
} from '@/reducer/newPropertyReducer';

interface PropertyDateProps {
  dispatch: Dispatch<Action>;
}

function PropertyDates({ dispatch }: PropertyDateProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    }
    return '';
  };

  return (
    <div>
      <Flatpickr
        className="border-2 rounded-sm border-gray-200"
        placeholder="Property available from"
        value={selectedStartDate as Date}
        onChange={(selectedDates) => {
          setSelectedStartDate(selectedDates[0]);
          dispatch({
            type: TYPE.SET_AVAILABLEFROM,
            payload: formatDate(selectedDates[0]),
          });
          // Clear end date when start date is selected
          setSelectedEndDate(null);
        }}
        options={{
          dateFormat: 'Y-m-d',
          minDate: 'today',
          maxDate: '2026-12-31',
        }}
        name="availableFrom"
      />
      {selectedStartDate && (
        <p>Selected Start Date: {selectedStartDate.toLocaleDateString()}</p>
      )}

      <Flatpickr
        className="border-2 rounded-sm border-gray-200"
        placeholder="Property available until"
        value={selectedEndDate as Date}
        onChange={(selectedDates) => {
          if (selectedStartDate && selectedDates[0] < selectedStartDate) {
            alert('End date cannot be before start date.');
            return;
          }
          dispatch({
            type: TYPE.SET_AVAILABLEUNTIL,
            payload: formatDate(selectedDates[0]),
          });
          setSelectedEndDate(selectedDates[0]);
        }}
        options={{
          dateFormat: 'Y-m-d',
          minDate: selectedStartDate || 'today',
          maxDate: '2026-12-31',
        }}
        name="availableUntil"
      />
      {selectedEndDate && (
        <p>Selected End Date: {selectedEndDate.toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default PropertyDates;
