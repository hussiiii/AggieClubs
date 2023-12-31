import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import ClubCard from '../components/ClubCard';

type Club = {
  id: string;
  name: string;
  description: string;
  profilePicture: string;
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch clubs data 
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs`)
      .then(res => res.json())
      .then(data => {
        setClubs(data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error("Failed to fetch clubs:", error);
        setLoading(false);  
      });
  }, []);

  const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase())); 

  return (
    <Layout>
{/* Hero Section */}
<div className="bg-gray-200 py-12 mb-8 rounded-xl shadow-md">
        <h2 className="text-center text-cyan-500 text-4xl mb-4">Welcome to Aggie Clubs!</h2>
        <p className="text-center text-gray-600 text-xl mb-8">
          Discover the most popular student-run clubs at UC Davis. Join a community, pursue a hobby, or simply explore what's out there.
        </p>
        <p className="text-center text-gray-600 text-xl mb-8">(Please read the README.md file for how to use & how this fulfills the take-home reqs)</p>
        <div className="text-center">
        <input //search bar 
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 shadow-md focus:ring focus:ring-opacity-50 focus:ring-cyan-400 focus:border-cyan-400"
          placeholder="Search for a club..."
        />
        </div>
      </div>

      {loading ? (
        <p className="text-center my-4 text-cyan-500">Loading clubs... (refresh if this takes too long)</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default Home;
