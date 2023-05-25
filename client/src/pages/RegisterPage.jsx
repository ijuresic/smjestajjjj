import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterForm = async (e) => {
    try {
      e.preventDefault();
      await axios.post('user/register', {
        name,
        email,
        password,
      });
      toast.success('Registracija je uspješna, sada se možete prijaviti!');
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.log('Error: ', err.message);
      }
    }
  };

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Registracija</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterForm}>
          <input
            type="text"
            placeholder="Ana Anić"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="primjer@email.hr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Registracija</button>
          <div className="text-center py-2 text-gray-500">
            Već si registriran?{' '}
            <Link className="text-black underline" to={'/login'}>
              Prijava
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
