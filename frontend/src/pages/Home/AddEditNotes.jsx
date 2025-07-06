import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ type, noteData, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [error, setError] = useState(null);

  // Add Note 
  const AddNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags: [],
        isPinned: false,
      });

      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Edit Note
  const EditNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content,
        tags: [],
        isPinned: false,
      });

      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSubmit = () => {
    if (!title) {
      setError('Please enter a title');
      return;
    }
    if (!content) {
      setError('Please enter content');
      return;
    }
    setError('');
    type === 'edit' ? EditNote() : AddNewNote();
  };

  return (
    <div className="relative text-slate-800">
      {/* Close Button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -right-4 hover:bg-gray-100 transition"
        onClick={onClose}
        title="Close"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Form Heading */}
      <h2 className="text-2xl font-bold mb-4">
        {type === 'edit' ? 'Edit Note' : 'Add a New Note'}
      </h2>

      {/* Title Input */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          placeholder="e.g., Meeting notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
        />
      </div>

      {/* Content Input */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-gray-600">Content</label>
        <textarea
          rows={8}
          placeholder="Write your note content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-none bg-slate-50"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm font-semibold"
      >
        {type === 'edit' ? 'Update Note' : 'Add Note'}
      </button>
    </div>
  );
};

export default AddEditNotes;
