import React, { useState } from 'react';
import { User } from '../types';

interface ProofSubmissionFormProps {
  currentUser: User;
  onSubmitProof: (content: string) => void;
}

const ProofSubmissionForm: React.FC<ProofSubmissionFormProps> = ({
  currentUser,
  onSubmitProof,
}) => {
  const [proofContent, setProofContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proofContent.trim()) {
      onSubmitProof(proofContent.trim());
      setProofContent('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Submit Proof</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={proofContent}
          onChange={(e) => setProofContent(e.target.value)}
          placeholder="Enter your proof..."
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Proof
        </button>
      </form>
    </div>
  );
};

export default ProofSubmissionForm;