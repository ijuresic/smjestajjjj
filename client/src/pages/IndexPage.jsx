import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Spinner from '../components/Spinner';

const IndexPage = () => {
  const { places, loading } = useContext(PlaceContext);

  if (loading) {
    return <Spinner />;
  }

  useEffect(() => {
    console.log("places", places)
    axios.get('/api/index', { headers: { 'Cache-Control': 'no-cache' } });
  }, [places])

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && <Image src={place.photos?.[0]} />}
            </div>
            <h1 className="font-bold">{place.title}</h1>
            <h3 className="text-sm text-gray-500 ">{place.address}</h3>
            <div className="mt-1">
              <span className="font-semibold">{place.price} € </span>
              po noćenju
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;