// pages/register.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'; //for redirecting user to diff page 

const Register = () => {
  const router = useRouter(); //fore redirecting user to diff page 

  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/clubs/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: clubName,
          description,
          profilePicture,
        }),
      });
  
      if (response.ok) {
        alert('Club registered successfully!');
        setClubName('');
        setDescription('');
        setProfilePicture('');
        router.push('/');
      } else {
        const responseData = await response.json();
        alert(responseData.error || 'Failed to register the club');
      }
    } catch (error) {
      alert('Error occurred while registering the club.');
    }
  };
  

  return (
    <Layout>
      <h1 className="text-center my-6 text-cyan-500 text-xl">Register Your Club</h1>
      <form onSubmit={handleSubmit} className="mx-auto w-1/2">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubName">
            Club Name
          </label>
          <input
            type="text"
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
            Profile Picture URL (right click image, then 'copy image address')
          </label>
          <input
            type="text"
            id="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
      </form>
    </Layout>
  );
};

export default Register;
