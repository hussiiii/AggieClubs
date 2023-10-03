// components/AuthButtons.tsx

import Link from 'next/link';
import firebase from '../firebase.js';

type AuthButtonsProps = {
  isAuthenticated: boolean;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated }) => {
  return (
    //these are fragments: used when u wanna group stuff together (bc usually you can only return one thing, else you need to use a div or smth)
    <> 
      {!isAuthenticated ? ( //if not authernticated show these buttons 
        <>
          <Link href="/signin" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">Sign In</button>
          </Link>
          <Link href="/signup" passHref>
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded">Sign Up</button>
          </Link>
        </>
      ) : ( //else show these ones
        <>
          <Link href="/register" passHref>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded">Register Club</button>
          </Link>
          <button className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded" onClick={() => firebase.auth().signOut()}>Sign Out</button>
        </>
      )}
    </>
  );
}

export default AuthButtons;
