import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes
router.get('/', async(req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// Create a new note
router.post('/', async(req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
});

// Update a note
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNote); 
});

// Delete a note
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(204).send();
});

export default router;