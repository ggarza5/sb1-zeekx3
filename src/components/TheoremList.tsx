import React, { useState } from 'react';
import { Theorem, User, Vote } from '../types';
import { ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import CommentSection from './CommentSection';
import ProofSubmissionForm from './ProofSubmissionForm';

interface TheoremListProps {
  theorems: Theorem[];
  currentUser: User;
  onVote: (theoremId: string, vote: Vote) => void;
  onAddLemma: (theoremId: string, content: string) => void;
  onAddComment: (theoremId: string, content: string) => void;
  onVoteComment: (theoremId: string, commentId: string, value: 1 | -1) => void;
  onSubmitProof: (theoremId: string, content: string) => void;
}

const TheoremList: React.FC<TheoremListProps> = ({
  theorems,
  currentUser,
  onVote,
  onAddLemma,
  onAddComment,
  onVoteComment,
  onSubmitProof,
}) => {
  const [newLemma, setNewLemma] = useState('');
  const [activeTheorem, setActiveTheorem] = useState<string | null>(null);

  const handleVote = (theoremId: string, value: 1 | -1) => {
    onVote(theoremId, { userId: currentUser.id, value });
  };

  const handleAddLemma = (theoremId: string) => {
    if (newLemma.trim()) {
      onAddLemma(theoremId, newLemma.trim());
      setNewLemma('');
      setActiveTheorem(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Active Theorems</h2>
      <ul className="space-y-4">
        {theorems.map((theorem) => (
          <li key={theorem.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{theorem.title}</h3>
                <p className="text-gray-600">{theorem.description}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleVote(theorem.id, 1)} className="mr-2">
                  <ThumbsUp className="text-gray-400 hover:text-blue-600" />
                </button>
                <span className="mr-2">{theorem.votes.reduce((acc, vote) => acc + vote.value, 0)}</span>
                <button onClick={() => handleVote(theorem.id, -1)}>
                  <ThumbsDown className="text-gray-400 hover:text-red-600" />
                </button>
                <ChevronRight className="text-gray-400 ml-4" />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Author: {theorem.author.username}</span>
              <span>Status: {theorem.status}</span>
            </div>
            {activeTheorem === theorem.id && (
              <div className="mt-4">
                <textarea
                  value={newLemma}
                  onChange={(e) => setNewLemma(e.target.value)}
                  placeholder="Enter new lemma"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <button
                  onClick={() => handleAddLemma(theorem.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Lemma
                </button>
              </div>
            )}
            {activeTheorem !== theorem.id && (
              <button
                onClick={() => setActiveTheorem(theorem.id)}
                className="mt-2 text-blue-600 hover:underline"
              >
                Add Lemma
              </button>
            )}
            <CommentSection
              comments={theorem.comments}
              currentUser={currentUser}
              onAddComment={(content) => onAddComment(theorem.id, content)}
              onVoteComment={(commentId, value) => onVoteComment(theorem.id, commentId, value)}
            />
            <ProofSubmissionForm
              currentUser={currentUser}
              onSubmitProof={(content) => onSubmitProof(theorem.id, content)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheoremList;