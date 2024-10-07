import React, { useState } from 'react';
import { Admin, User } from '../types';

interface AdminSectionProps {
  admins: Admin[];
  currentUser: User;
  onVoteAdmin: (adminId: string) => void;
  onNominateAdmin: (userId: string, role: 'moderator' | 'reviewer') => void;
}

const AdminSection: React.FC<AdminSectionProps> = ({
  admins,
  currentUser,
  onVoteAdmin,
  onNominateAdmin,
}) => {
  const [nomineeId, setNomineeId] = useState('');
  const [nomineeRole, setNomineeRole] = useState<'moderator' | 'reviewer'>('moderator');

  const handleNominate = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomineeId) {
      onNominateAdmin(nomineeId, nomineeRole);
      setNomineeId('');
    }
  };

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Admins</h2>
      <ul className="space-y-2">
        {admins.map((admin) => (
          <li key={admin.id} className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{admin.user.username}</span>
              <span className="ml-2 text-gray-500">({admin.role})</span>
            </div>
            <div>
              <span className="mr-2">Votes: {admin.votes}</span>
              <button
                onClick={() => onVoteAdmin(admin.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Vote
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleNominate} className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Nominate Admin</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={nomineeId}
            onChange={(e) => setNomineeId(e.target.value)}
            placeholder="User ID"
            className="flex-grow p-2 border rounded"
          />
          <select
            value={nomineeRole}
            onChange={(e) => setNomineeRole(e.target.value as 'moderator' | 'reviewer')}
            className="p-2 border rounded"
          >
            <option value="moderator">Moderator</option>
            <option value="reviewer">Reviewer</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Nominate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSection;