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
    <div className="space-y-4 flex flex-col">
      <div className="flex flex-wrap items-center space-x-4">
        <Flatpickr
          className="w-60 p-2 border-2 rounded-md border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Property available from"
          value={selectedStartDate as Date}
          onChange={(selectedDates) => {
            setSelectedStartDate(selectedDates[0]);
            dispatch({
              type: TYPE.SET_AVAILABLEFROM,
              payload: formatDate(selectedDates[0]),
            });

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
          <p className="text-sm text-gray-600">
            Available from: {selectedStartDate.toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center space-x-4">
        <Flatpickr
          disabled={!selectedStartDate}
          className="w-60  p-2 border-2 rounded-md border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
          <p className="text-sm text-gray-600">
            Until: {selectedEndDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default PropertyDates;
