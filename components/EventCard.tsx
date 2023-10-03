// components/EventCard.tsx

type Event = {
    id: string;
    clubId: string;
    eventName: string;
    description: string;
    eventDate: string;
    location: string; 
    picture: string;
  };

  
type EventCardProps = {
    event: Event;
  };
  
  const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
      <li className="mb-4 p-4 border rounded shadow">
        <h3 className="text-xl mb-2">{event.eventName}</h3>
        <p>{event.description}</p>
        <p className="text-gray-500">{event.location}</p>
        <p className="mt-2 text-gray-500">{event.eventDate}</p>
      </li>
    );
  }
  
  export default EventCard;
  