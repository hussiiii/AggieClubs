// index.tsx

import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';

type Club = {
  id: string;
  name: string;
  description: string;
  profilePicture: string;
};

type HomeProps = {
  clubs: Club[];
};

const Home: React.FC<HomeProps> = ({ clubs }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term
  const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase())); 

  return (
    <Layout>
            {/* Hero Section */}
            <div className="bg-gray-200 py-12 mb-8 rounded-xl shadow-md">
        <h2 className="text-center text-cyan-500 text-4xl mb-4">Welcome to Aggie Clubs!</h2>
        <p className="text-center text-gray-600 text-xl mb-8">
          Discover the most popular student-run clubs at UC Davis. Join a community, pursue a hobby, or simply explore what's out there.
        </p>
        <p className="text-center text-gray-600 text-xl mb-8">(Please read the README.md file or watch the mp4 video to see how this fulfills the take-home requirements)</p>
        <div className="text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 shadow-md focus:ring focus:ring-opacity-50 focus:ring-cyan-400 focus:border-cyan-400"
          placeholder="Search for a club..."
        />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <li key={club.id} className="p-6 border rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white">
            <a href={`/clubs/${club.id}`} className="block hover:text-cyan-500">
              <img src={club.profilePicture || 'https://via.placeholder.com/150'} alt={club.name} className="w-full h-48 object-cover mb-4 rounded"/>
              <h3 className="text-xl font-bold mb-2">{club.name}</h3>
              <p className="text-sm">{club.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/clubs');
  const clubs: Club[] = await response.json();

  return {
    props: {
      clubs,
    },
  };
};

export default Home;
