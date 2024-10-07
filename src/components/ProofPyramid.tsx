import React from 'react';
import { ProofPyramid, Lemma } from '../types';

interface ProofPyramidProps {
  proofPyramid: ProofPyramid;
}

const ProofPyramidComponent: React.FC<ProofPyramidProps> = ({ proofPyramid }) => {
  const renderLemma = (lemma: Lemma, depth: number) => (
    <div key={lemma.id} className={`ml-${depth * 4} mb-2`}>
      <div className="bg-white p-3 rounded shadow">
        <p className="font-semibold">{lemma.content}</p>
        <div className="text-sm text-gray-500 mt-1">
          <span>Author: {lemma.author.username}</span>
          <span className="ml-2">Status: {lemma.status}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Proof Pyramid</h2>
      <div className="bg-blue-100 p-4 rounded mb-4">
        <h3 className="text-xl font-semibold">{proofPyramid.theorem.title}</h3>
        <p>{proofPyramid.theorem.description}</p>
      </div>
      <div className="space-y-2">
        {proofPyramid.lemmas.map((lemma, index) => renderLemma(lemma, index))}
      </div>
    </div>
  );
};

export default ProofPyramidComponent;