import React, { useState } from 'react'
import Header from './components/Header'
import TheoremList from './components/TheoremList'
import ProofPyramidComponent from './components/ProofPyramid'
import CreateTheorem from './components/CreateTheorem'
import AISuggestions from './components/AISuggestions'
import AdminSection from './components/AdminSection'
import { User, Theorem, ProofPyramid, Vote, AISuggestion, Admin } from './types'

// Mock data
const mockUser: User = {
  id: '1',
  username: 'JohnDoe',
  reputation: 100
}

const initialTheorems: Theorem[] = [
  {
    id: '1',
    title: 'Pythagorean Theorem',
    description: 'In a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides.',
    author: mockUser,
    status: 'open',
    votes: [],
    lemmas: [],
    proofSubmissions: [],
    comments: []
  }
]

const initialProofPyramid: ProofPyramid = {
  theorem: initialTheorems[0],
  lemmas: []
}

const initialAISuggestions: AISuggestion[] = [
  {
    id: '1',
    content: 'Consider proving the theorem for a specific right-angled triangle first.',
    type: 'lemma'
  }
]

const initialAdmins: Admin[] = [
  {
    id: '1',
    user: mockUser,
    role: 'moderator',
    votes: 5
  }
]

function App() {
  const [user] = useState<User>(mockUser)
  const [theorems, setTheorems] = useState<Theorem[]>(initialTheorems)
  const [proofPyramid] = useState<ProofPyramid>(initialProofPyramid)
  const [aiSuggestions] = useState<AISuggestion[]>(initialAISuggestions)
  const [admins] = useState<Admin[]>(initialAdmins)

  const handleCreateTheorem = (title: string, description: string) => {
    const newTheorem: Theorem = {
      id: (theorems.length + 1).toString(),
      title,
      description,
      author: user,
      status: 'open',
      votes: [],
      lemmas: [],
      proofSubmissions: [],
      comments: []
    }
    setTheorems([...theorems, newTheorem])
  }

  const handleVote = (theoremId: string, vote: Vote) => {
    setTheorems(theorems.map(theorem => 
      theorem.id === theoremId 
        ? { ...theorem, votes: [...theorem.votes, vote] }
        : theorem
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <CreateTheorem user={user} onCreateTheorem={handleCreateTheorem} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <TheoremList 
              theorems={theorems} 
              currentUser={user} 
              onVote={handleVote}
              onAddLemma={() => {}}
              onAddComment={() => {}}
              onVoteComment={() => {}}
              onSubmitProof={() => {}}
            />
            <AdminSection 
              admins={admins} 
              currentUser={user} 
              onVoteAdmin={() => {}} 
              onNominateAdmin={() => {}}
            />
          </div>
          <div>
            <ProofPyramidComponent proofPyramid={proofPyramid} />
            <AISuggestions suggestions={aiSuggestions} onAccept={() => {}} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App