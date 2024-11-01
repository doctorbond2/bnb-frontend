'use client';
import { Customer } from '@/models/interfaces/booking';
import useStore from '@/lib/hooks/useStore';
import useStoreData from '@/lib/hooks/useStoreData';
import { BookingStatus } from '@/models/enum/booking';
import { decideBooking } from '@/lib/handlers/booking';
import { parseCustomerJson } from '@/lib/helpers/json';
import Link from 'next/link';
import { useState } from 'react';

export default function UserProperties() {
  const { dispatch } = useStore();
  const { user, properties } = useStoreData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string>('');

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
  // <div className="min-h-screen flex justify-center">
  //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-12"></div>
  //       </div>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg ">
      <h1 className="text-2xl font-bold mb-4">Your Properties</h1>
      <ul className="space-y-6">
        {properties.map((property, index: number) => {
          return (
            <li
              key={property.id}
              className="border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <div className="flex flex-row justify-between">
                <div>
                  <p className="font-semibold">Property: {index + 1}</p>
                  <p className="text-lg">Property Name: {property.name}</p>
                  <p className="text-gray-600">Address: {property.address}</p>
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-md hover:text-blue-500 "
                  >
                    View now
                  </Link>
                </div>
                <Link
                  href={`/user/${user.id}/profile/hostedProperties/${property.id}`}
                >
                  <div className="relative group flex flex-col">
                    <button
                      disabled={property.bookings.length > 0}
                      className={`text-blue-500 hover:text-white mb-2 w-fit border-2 px-4 py-2 rounded-md ${
                        property.bookings.length > 0
                          ? 'cursor-not-allowed hover:border-red-500 hover:bg-red-500'
                          : 'hover:border-blue-500 hover:bg-blue-500'
                      }`}
                      onClick={(e) => {
                        if (property.bookings.length > 0) {
                          e.preventDefault();
                          alert('Property has bookings');
                          return;
                        }
                      }}
                    >
                      Edit
                    </button>
                    {property.bookings.length > 0 && (
                      <div className="absolute left-0 bottom-full mb-2 w-max bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Has active bookings
                      </div>
                    )}
                  </div>
                </Link>
              </div>
              <h3 className="font-medium">Active Bookings</h3>
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
                      <Link
                        href={`/user/${user.id}/profile/bookings/${booking.id}`}
                      >
                        View Booking
                      </Link>
                      {booking.confirmationCode && (
                        <p className="font-semibold">
                          Confirmation Code: {booking.confirmationCode}
                        </p>
                      )}
                      <p className="text-gray-800">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <button
                        disabled={booking.status !== BookingStatus.PENDING}
                        className={`p-2 border rounded-md mt-2 ${
                          booking.status === BookingStatus.PENDING
                            ? 'bg-yellow-500 text-white'
                            : BookingStatus.ACCEPTED
                            ? ' text-green-700 border-none cursor-default'
                            : 'bg-red-400 text-gray-200 cursor-default'
                        }`}
                        onClick={() => {
                          setSelectedBooking(booking.id);
                          setIsModalOpen(true);
                        }}
                      >
                        {booking.status.toUpperCase()}
                      </button>
                      {booking.status === BookingStatus.ACCEPTED && (
                        <button
                          className="px-4 py-2 border rounded-md mt-2 md:ml-2 bg-red-500 text-white"
                          onClick={() => {
                            setIsCancelModalOpen(true);
                          }}
                        >
                          Cancel
                        </button>
                      )}
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
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Cancel booking?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                }}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
