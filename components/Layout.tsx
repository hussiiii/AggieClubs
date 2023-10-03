import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from '../firebase.js';
import AuthButtons from './AuthButtons';

//define typescript type 
type LayoutProps = {
  children: React.ReactNode;
};

//functional component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup the authentication listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4">
        <Link href="/">
          <button className="text-2xl font-bold">Aggie Clubs!</button>
        </Link>
        <AuthButtons isAuthenticated={isAuthenticated} />
      </header>

      <main className="flex-1 px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">© 2023 ClubApp</p>
      </footer>
    </div>
  );
}

//export it so you can import it and use it in other files 
export default Layout;
