import { Property } from '@/models/interfaces/property';
import { useState } from 'react';
export default function AllPropertiesList({
  propertyList,
}: {
  propertyList: Property[];
}) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        All Properties
      </h1>

      <ul>
        <div className="space-y-4">
          {propertyList.map((property) => (
            <li key={property.id}>
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-wrap overflow-hidden justify-between">
                <div id="info-section">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {property.name}
                    </h3>
                  </div>
                  <div className="text-gray-700">
                    <p className="text-sm">{property.price_per_night}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ID: {property.id}
                    </p>
                    <p>
                      Number of Images:{' '}
                      {property.images?.length ? property.images.length : '0'}
                    </p>
                  </div>
                </div>
                <div
                  id="button section"
                  className="flex flex-wrap items-center space-x-2"
                >
                  <button className="p-2 h-fit bg-black rounded-md text-red-600">
                    Hard Delete
                  </button>
                  <button
                    className={`p-2 h-fit rounded-md ${
                      !!property.deletedAt ? 'bg-gray-400' : 'bg-red-500'
                    }`}
                    disabled={!!property.deletedAt}
                  >
                    Soft Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
