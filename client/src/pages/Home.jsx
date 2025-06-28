import React, {useState, useEffect } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes'
import NoteCard from '../components/NoteCard'

const Home = () => {
    const [notes, setNotes] = useState([])
    const [form, setForm] = useState({ title: '', content: '' })
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async () => {
        try {
            const { data } = await getNotes()
            setNotes(data)
        } catch (err) {
            console.error('Error fetching notes:', err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await updateNote(editingId, form)
            } else {
                await createNote(form)
            }
            setForm({ title: '', content: '' })
            setEditingId(null)
            fetchNotes()
        } catch (err) {
            console.error('Error submitting form', err)
        }
    }

    const handleEdit = (note) => {
        setForm({ title: note.title, content: note.content })
        setEditingId(note._id)
    }

    const handleDelete = async (id) => {
        try {
            await deleteNote(id)
            fetchNotes()
        } catch (err) {
            console.error('Error deleting note:', err)
        }
    }

    return (
        <div className='min-h-screen py-8 px-4'>
            <div className='max-w-xl mx-auto'>
                <h1 className='text-3xl font-bold mb-6 text-center'>📝 Notes App</h1>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className='bg-white p-4 rounded-lg shadow-md space-y-4 mb-8'>
                    <input 
                        type='text'
                        placeholder='title'
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                        required
                    />
                    <textarea
                        placeholder='Content'
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                        rows='4'
                    />
                    <button
                        type='submit'
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer'
                    >
                        {editingId ? 'Update Note' : 'Add Note'}
                    </button>
                </form>

                {/* Notes list */}
                <div className='space-y-4'>
                    {notes.length === 0 ? (
                        <p className='text-center text-gray-500'>No notes yet.</p>
                    ) : (
                        notes.map((note) => (
                            <NoteCard 
                                key={note._id}
                                note={note}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home