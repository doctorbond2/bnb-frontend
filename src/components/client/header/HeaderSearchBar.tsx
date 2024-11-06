'use client';
import { useState } from 'react';
import { sendRequest } from '@/lib/helpers/fetch';

import SearchUserResult from './SearchUserResult';
import SearchPropertyResult from './SearchPropertyResult';
import { Property } from '@/models/interfaces/property';
import { User } from '@/models/interfaces/user';
import {
  typeguard_isProperty as isProperty,
  typeguard_isUser as isUser,
} from '@/lib/helpers/typeGuards';
export default function HeaderSearchBar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debounce<F extends (...args: any[]) => void | Promise<void>>(
    func: F,

    delay: number
  ) {
    let timeoutId: NodeJS.Timeout | number | undefined;

    return (...args: Parameters<F>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        await func(...args);
      }, delay);
    };
  }

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<(Property | User)[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    if (value.length < 3) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const response: { data: Property[]; status: number } = await sendRequest({
      url: `/api/search`,
      method: 'GET',
      searchQuery: value,
    });
    console.log(response.data);
    setIsSearching(false);
    setSearchResults(response.data);
  };
  const debouncedSearch = debounce(handleSearch, 2000);
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };
  return (
    <div className="relative flex items-center">
      <input
        maxLength={50}
        type="text"
        value={searchValue}
        onChange={onSearchInputChange}
        placeholder="Search"
        className="border border-gray-300 rounded-lg p-1 w-64"
      />
      {isSearching && <div className="ml-2">Searching...</div>}
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {searchResults.map((result) => {
            if (isProperty(result)) {
              console.log('returning property');
              return <SearchPropertyResult key={result.id} property={result} />;
            } else if (isUser(result)) {
              console.log('returning user');
              return <SearchUserResult key={result.id} user={result} />;
            }
          })}
        </div>
      )}
    </div>
  );
}
