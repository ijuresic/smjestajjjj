import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UserProvider';
import { setItemsInLocalStorage } from '../utils';
import ProfilePage from './ProfilePage';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, loading, setUser } = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('user/login', { email, password });
      console.log(`setting ${data} in local storage`)
      setItemsInLocalStorage('token', data.token);
      setUser(data.user);

      toast.success('Prijava uspješna!');
      setRedirect(true);
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

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (user) {
    return <ProfilePage />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Prijava</h1>
        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
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
          <button className="primary">Prijava</button>
          <div className="text-center py-2 text-gray-500">
            Nemaš kreiran račun?{' '}
            <Link className="text-black underline" to={'/register'}>
              Registriraj se!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
