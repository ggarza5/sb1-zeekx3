import React, { useState } from 'react';
import { Comment, User } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
  onVoteComment: (commentId: string, value: 1 | -1) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  currentUser,
  onAddComment,
  onVoteComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-50 p-2 rounded">
            <p>{comment.content}</p>
            <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
              <span>{comment.author.username}</span>
              <div className="flex items-center">
                <button onClick={() => onVoteComment(comment.id, 1)} className="mr-1">
                  <ThumbsUp size={16} className="text-gray-400 hover:text-blue-600" />
                </button>
                <span className="mr-1">{comment.votes.reduce((acc, vote) => acc + vote.value, 0)}</span>
                <button onClick={() => onVoteComment(comment.id, -1)}>
                  <ThumbsDown size={16} className="text-gray-400 hover:text-red-600" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment} className="mt-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
          rows={2}
        />
        <button
          type="submit"
          className="mt-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;