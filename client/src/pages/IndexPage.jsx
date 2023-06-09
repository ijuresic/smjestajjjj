import React, { useContext, useEffect } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../components/Image';
import Spinner from '../components/Spinner';

const IndexPage = () => {
  const { places, loading } = useContext(PlaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("places", places);
    // Ovdje možete obaviti vaš zahtjev ako je potrebno

    if (!places || places.length === 0) {
      navigate('/');
    }
  }, [places, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 ">
      {places.map((place) => (
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
