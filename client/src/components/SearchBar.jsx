import React, { useContext, useEffect, useState } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setPlaces, setLoading } = useContext(PlaceContext);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    setLoading(true);

    
    const timeout = setTimeout(async () => {
      console.log(searchText)
      const { data } = await axios.get(`/places${searchText.length ? `/search/${searchText}` : ""}`);
      setPlaces(searchText.length ? data : data.places);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout)
    }
  }, [searchText])

  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setLoading(true);

    
    const timeout = setTimeout(async () => {
      const { data } = await axios.get(`/places/search${searchText ? `/${searchText}` : ""}`);
      setPlaces(data);
      setLoading(false);
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleCancel = () => {
    setSearchText('');
    setPlaces(null);
    navigate ("/");
  };
  
  return (
    <>
      <div className="flex w-3/5 md:w-1/2 bg-gray-300 border border-gray-400 rounded-full overflow-hidden shadow-sm hover:shadow-lg">
        <div className="grow">
          <input
            type="search"
            placeholder="Kamo želite ići?"
            className="w-full py-2 px-4 border-none focus:outline-none  text-sm md:text-lg"
            onChange={handleTextChange}
            value={searchText}
          />
        </div>
        <div className="flex  bg-red text-white cursor-pointer">
          <button
            className="flex py-2 px-4 md:p-2 bg-primary rounded-r-full"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="hidden md:block ml-1">Pretraži</span>
          </button>
          
        </div>
      </div>
    </>
  );
};

export default SearchBar;
