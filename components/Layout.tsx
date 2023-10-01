import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from '../firebase.js';

type LayoutProps = {
  children: React.ReactNode;
};

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
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/signin" passHref>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">Sign In</button>
              </Link>
              <Link href="/signup" passHref>
                <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded">Sign Up</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded">Register Club</button>
              </Link>
              <button className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded" onClick={() => firebase.auth().signOut()}>Sign Out</button>
            </>
          )}
        </div>
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

export default Layout;
