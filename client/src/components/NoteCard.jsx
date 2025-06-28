import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md space-y-2'>
        <h2 className='text-xl font-semibold'>{note.title}</h2>
        <p className='text-gray-700'>{note.content}</p>
        <div className='flex gap-2 mt-2'>
            <button
                onClick={() => onEdit(note)}
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer'
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(note._id)}
                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer'
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default NoteCard;