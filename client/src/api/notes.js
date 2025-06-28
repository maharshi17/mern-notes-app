import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// API calls
export const getNotes = () => API.get('/notes');
export const createNote = (newNote) => API.post('/notes', newNote);
export const updateNote = (id, updatedNote) => API.put(`/notes/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);