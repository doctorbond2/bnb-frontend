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
    <div>
      {properties.map((property) => {
        console.log(property);
        return (
          <li key={property.id}>
            <p>Property name: {property.name}</p>
            <p>Address: {property.address}</p>
            <p>Bookings:</p>
            <Link href={`/user/${user.id}/hostedProperties/${property.id}`}>
              Edit
            </Link>
            <ul>
              {property.bookings.map((booking) => {
                const customer = parseCustomerJson(
                  booking.customer
                ) as Customer;
                return (
                  <li key={booking.id}>
                    <p>Confirmation Code: {booking.confirmationCode}</p>
                    <p>{customer.firstName}</p>
                    <button
                      disabled={booking.status !== BookingStatus.PENDING}
                      className="p-1 border-2 rounded-sm"
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
      <div id="decision-modal">
        {isModalOpen ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg relative">
              <h2>Accept customer booking?</h2>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedBooking('');
                  }}
                  className="absolute top-0 right-0 px-1 bg-red-400 rounded"
                >
                  X
                </button>
                <button
                  onClick={async () => {
                    await confirmDecision(true);
                    setIsModalOpen(false);
                  }}
                  className="bg-green-500 text-black px-4 py-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={async () => {
                    await confirmDecision(false);
                    setIsModalOpen(false);
                  }}
                  className="bg-red-500 text-black px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
