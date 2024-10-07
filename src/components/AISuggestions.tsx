import React from 'react';
import { AISuggestion } from '../types';

interface AISuggestionsProps {
  suggestions: AISuggestion[];
  onAccept: (suggestion: AISuggestion) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions, onAccept }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI Suggestions</h2>
      <ul className="space-y-4">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{suggestion.type === 'theorem' ? 'Theorem' : 'Lemma'}</h3>
                <p className="text-gray-600">{suggestion.content}</p>
              </div>
              <button
                onClick={() => onAccept(suggestion)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AISuggestions;