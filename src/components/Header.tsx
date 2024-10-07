import React from 'react';
import { User } from '../types';
import { UserCircle } from 'lucide-react';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">DecentralizedProof</h1>
        {user ? (
          <div className="flex items-center">
            <UserCircle className="mr-2" />
            <span>{user.username}</span>
          </div>
        ) : (
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;