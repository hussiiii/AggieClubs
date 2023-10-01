// pages/signup.tsx
import React, { useState } from 'react';
import firebase from '../firebase.js';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError('');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
  <div className="w-96 p-8 border rounded shadow">
    <h1 className="text-2xl mb-4">Register as a New User</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Sign Up</button>
    </form>
    {error && <p className="mt-4 text-red-500">{error}</p>}
  </div>
</div>
  );
};

export default Register;
