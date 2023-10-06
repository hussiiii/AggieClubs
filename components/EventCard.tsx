import React from 'react';
import { useRouter } from 'next/router';

type Event = {
  eventId: string;
  clubId: string;
  eventName: string;
  description: string;
  eventDate: string;
  location: string;
  picture: string;
};

type EventCardProps = {
  event: Event;
  isAuthenticated: boolean; 
};

const EventCard: React.FC<EventCardProps> = ({ event, isAuthenticated }) => {
  const router = useRouter();

  const handleResolve = async () => {
    console.log("Resolve button pressed"); // debug 

    const url = `/api/clubs/${event.clubId}/delete-events?id=${event.eventId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      console.log('Delete response:', response); //debug 

      const data = await response.json();
      console.log('Delete response data:', data); //debug wtf os going on

      if (response.ok) {
        router.reload();
      } else {
        console.error("Error while trying to delete:", data);
      }
    } catch (err) {
      console.error("Exception while trying to delete:", err);
    }
  };

  return (
    <li className="mb-4 p-4 border rounded shadow">
        <div className="flex justify-between items-center">
            {/* Content of the Event */}
            <div>
                <h3 className="text-xl mb-2">{event.eventName}</h3>
                <p>{event.description}</p>
                <p className="text-gray-500">{event.location}</p>
                <p className="mt-2 text-gray-500">{event.eventDate}</p>
            </div>

            {/* Resolve Button */}
            {isAuthenticated && (
                <button 
                    onClick={handleResolve} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Resolve
                </button>
            )}
        </div>
    </li>
);

};

export default EventCard;

