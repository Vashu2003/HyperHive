import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Create Note (with image upload)
router.post('/create', protect, upload.single('image'), createNote);

// Get all notes for a group
router.get('/:groupId', protect, getNotes);

// Update a note
router.put('/:id', protect, upload.single('image'), updateNote);

// Delete a note
router.delete('/:id', protect, deleteNote);

export default router;
