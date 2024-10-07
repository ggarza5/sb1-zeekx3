import { User, Vote, Lemma, Theorem, ProofPyramid, AISuggestion } from './types'

// ... (previous type definitions remain the same)

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  votes: Vote[];
}

export interface ProofSubmission {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
  votes: Vote[];
  comments: Comment[];
}

export interface Admin {
  id: string;
  user: User;
  role: 'moderator' | 'reviewer';
  votes: number;
}

// Update Theorem and Lemma interfaces
export interface Theorem {
  // ... (previous properties remain the same)
  proofSubmissions: ProofSubmission[];
  comments: Comment[];
}

export interface Lemma {
  // ... (previous properties remain the same)
  proofSubmissions: ProofSubmission[];
  comments: Comment[];
}