'use client';
import { useState } from 'react';
import { sendRequest } from '@/lib/helpers/fetch';
import { debounce } from '@/lib/helpers/debouce';
export default function HeaderSearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = debounce(handleSearch, 300);
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length < 3) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const response = await sendRequest({
      url: `/api/search?search=${value}`,
      method: 'GET',
    });
    setIsSearching(false);
    setSearchResults(response.data);
  };

  return (
    <div className="flex items-center">
      <input
        maxLength={50}
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search"
        className="border border-gray-300 rounded-lg p-1"
      />
      {isSearching && <div>Searching...</div>}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}
