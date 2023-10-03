import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import firebase from '../../firebase.js'; 
import EventCard from '../../components/EventCard';


type Club = {
  id: string;
  name: string;
  description: string;
  profilePicture: string;
};

type Event = {
  id: string;
  clubId: string;
  eventName: string;
  description: string;
  eventDate: string;
  location: string; 
  picture: string;
};

const ClubDetails: React.FC = () => {
  const router = useRouter();
  const { clubId } = router.query;

  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // This will unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (clubId) {
      // Fetch club details
      fetch(`/api/clubs/${clubId}`)
        .then((response) => response.json())
        .then((data) => setClub(data));

      // Fetch events for the club
      fetch(`/api/clubs/${clubId}/events`)
        .then((response) => response.json())
        .then((data) => setEvents(data));
    }
  }, [clubId]);

  return (
    <Layout>
      {club && (
        <div className="my-6">
          <h1 className="text-center text-cyan-500 text-2xl mb-6">{club.name}</h1>
          <img src={club.profilePicture || 'https://via.placeholder.com/150'} alt={club.name} className="w-64 mx-auto mb-4" />
          <p className="text-center">{club.description}</p>
        </div>
      )}

      <h2 className="text-center my-6 text-cyan-500 text-xl">Upcoming Events</h2>
      
      <ul>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      </ul>


      {isAuthenticated && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push(`/clubs/${clubId}/register-event`)}
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Event
          </button>
        </div>
      )}
    </Layout>
  );
};

export default ClubDetails;