import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, date, content, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="group border rounded-2xl p-5 bg-white hover:shadow-xl transition-all duration-200 ease-in-out flex flex-col justify-between min-h-[200px] relative">
      {/* Pin Icon */}
      <button
        onClick={onPinNote}
        title={isPinned ? 'Unpin Note' : 'Pin Note'}
        className={`absolute top-4 right-4 p-1 rounded-full transition-all duration-200 
          ${isPinned ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'} 
          hover:bg-gray-100`}
      >
        <MdOutlinePushPin size={20} />
      </button>

      {/* Title & Date */}
      <div className="mb-2">
        <h2 className="text-base font-bold text-gray-800 truncate">{title}</h2>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      {/* Content Preview */}
      <p className="text-sm text-gray-700 mt-2 line-clamp-3">
        {content || <span className="italic text-gray-400">No content available.</span>}
      </p>

      {/* Divider */}
      <div className="border-t mt-4 mb-2" />

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={onEdit}
          title="Edit"
          className="text-gray-500 hover:text-indigo-600 transition transform hover:scale-110"
        >
          <MdCreate size={18} />
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="text-gray-500 hover:text-red-500 transition transform hover:scale-110"
        >
          <MdDelete size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
