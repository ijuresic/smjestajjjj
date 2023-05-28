import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axios.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      setTitle(place.title);
      setAddress(place.address);
      setAddedPhotos(place.photos);
      setDesc(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setPrice(place.price);
      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
    };
    if (id) {
      // update existing place
      console.log("foo", placeData, id)
      const { data } = await axios.put('/places/update-place', {
        id,
        ...placeData,
      });
    } else {
      // new place
      console.log(placeData)
      const { data } = await axios.post('/places/add-places', placeData);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>

        {preInput(
          'Naziv smještaja',
          'Napišite naziv svog smještaja',
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="primjerice 'Apartmani Danilo'"
        />

        {preInput('Adresa', 'Adresa i grad')}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="primjerice 'Jelačićev trg 15, Rijeka'"
        />

        {preInput('Fotografije', 'Što više to bolje')}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput('Opis', 'Opiši svoj smještaj')}
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />

        {preInput('Obilježja', 'Obilježi važnosti tvoga smještaja')}
        <Perks selected={perks} onChange={setPerks} />

        {preInput('Dodatne informacije', 'Pravila smještaja, važno za znati itd. ')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          'Prijava, odjava i cijena',
          'Definiraj vrijeme najranije prijave i najkasnije odjave. Vodi računa o tome da moraš očistiti smješataj. '
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Vrijeme prijave</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Vrijeme odjave</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Cijena po noći</h3>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
