'use client';
import { Customer } from '@/models/interfaces/booking';
import useStore from '@/lib/hooks/useStore';
import useStoreData from '@/lib/hooks/useStoreData';
import { BookingStatus } from '@/models/enum/booking';
import { decideBooking } from '@/lib/handlers/booking';
import Link from 'next/link';
import { useState } from 'react';

export default function UserProperties() {
  const { dispatch } = useStore();
  const { user, properties } = useStoreData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string>('');

  const parseCustomerJson = (customer: string | Customer) => {
    if (typeof customer === 'string') {
      try {
        return JSON.parse(customer);
      } catch (e) {
        console.log(e);
        return customer;
      }
    }
    return customer;
  };

  const confirmDecision = async (decision: boolean) => {
    if (!user.id) {
      setIsModalOpen(false);
      return;
    }
    try {
      await decideBooking(selectedBooking, decision, dispatch);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Your Properties</h1>
      <ul className="space-y-6">
        {properties.map((property, index: number) => {
          return (
            <li
              key={property.id}
              className="border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <p className="font-semibold">Property: {index + 1}</p>
              <p className="text-lg">Property Name: {property.name}</p>
              <p className="text-gray-600">Address: {property.address}</p>

              <Link
                href={`/user/${user.id}/profile/hostedProperties/${property.id}`}
                className="text-blue-500 hover:underline mb-2 block w-fit"
              >
                Edit
              </Link>
              <p className="font-medium">Bookings:</p>
              <ul className="space-y-4">
                {property.bookings.map((booking) => {
                  const customer = parseCustomerJson(
                    booking.customer
                  ) as Customer;
                  return (
                    <li
                      key={booking.id}
                      className="border p-2 rounded-md shadow-sm"
                    >
                      <p className="font-semibold">
                        Confirmation Code: {booking.confirmationCode}
                      </p>
                      <p className="text-gray-800">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <button
                        disabled={booking.status !== BookingStatus.PENDING}
                        className={`p-2 border rounded-md mt-2 ${
                          booking.status === BookingStatus.PENDING
                            ? 'bg-yellow-500 text-white'
                            : BookingStatus.ACCEPTED
                            ? 'bg-green-400 text-gray-700 cursor-not-allowed'
                            : 'bg-red-400 text-gray-200 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          setSelectedBooking(booking.id);
                          setIsModalOpen(true);
                        }}
                      >
                        {booking.status}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Accept customer booking?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBooking('');
                }}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full"
              >
                X
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={async () => {
                  await confirmDecision(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={async () => {
                  await confirmDecision(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
