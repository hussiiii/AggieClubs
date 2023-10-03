// components/ClubCard.tsx

type Club = {
    id: string;
    name: string;
    description: string;
    profilePicture: string;
  };
  

type ClubCardProps = {
    club: Club;
  };
  
  const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    return (
      <li className="p-6 border rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white">
        <a href={`/clubs/${club.id}`} className="block hover:text-cyan-500">
          <img src={club.profilePicture || 'https://via.placeholder.com/150'} alt={club.name} className="w-full h-48 object-cover mb-4 rounded"/>
          <h3 className="text-xl font-bold mb-2">{club.name}</h3>
          <p className="text-sm">{club.description}</p>
        </a>
      </li>
    );
  }
  
  export default ClubCard;
  