const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

noteRoutes.post('/notes', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({ message: "Note content can not be empty" });
    }
    try {
        const note = new noteModel(req.body.content);
        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.send(notes);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send(note);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({ message: "Note content can not be empty" });
    }
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            req.body.content,
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send(updatedNote);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);
        if (!deletedNote) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = noteRoutes;
