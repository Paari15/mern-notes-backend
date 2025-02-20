const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Create a new note
router.post('/notes', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
    }
});

// Get all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
});

// Update a note
router.put('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
});

module.exports = router;
