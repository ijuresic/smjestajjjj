import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Spinner from "../components/Spinner";
import AccountNav from "../components/AccountNav";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";

const BookedPlacesPage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axios.get('/bookings',);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        toast.error('Greška prilikom dohvaćanja rezervacija.');
      }
    };

    getBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/bookings/${bookingId}`);
      // Ukloni otkazanu rezervaciju iz lokalnog stanja
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      toast.success('Rezervacija je uspješno otkazana.');
    } catch (error) {
      toast.error('Došlo je do pogreške prilikom otkazivanja rezervacije.');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="my-3" key={booking._id}>
            <h1 className="flex bg-primary text-white p-3 my-1 rounded-xl justify-between items-center text-xl mb-4">Informacije o tvojoj rezervaciji</h1>
            <h1 className="text-xl">{booking.place.title}</h1>
            <AddressLink className="text-l" placeAddress={booking.place.address} />
            <div className="flex justify-between items-center">
              <div>
                <BookingDates booking={booking} />
              </div>
              <div className="text-xl">Ukupna cijena: {booking.price} €</div>
              <div className="flex flex-col gap-4">
                {booking.place && (
                  <p className="font-">
                    <Link to={`/place/${booking.place._id}`} key={booking.place._id}>
                      <button className="bg-primary text-white font-bold py-2 px-4 rounded">
                        Detalji o smještaju
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Otkaži rezervaciju
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Još nema rezervacija</h1>
          <p className="font-">
            Počni već sada planirati svoj odmor!{' '}
            <Link to="/" className="text-black-500 underline">
              Pogledaj ponudu!
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default BookedPlacesPage;
