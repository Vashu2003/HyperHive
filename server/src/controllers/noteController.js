import Note from '../models/Note.js';

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content, groupId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const note = await Note.create({
      title,
      content,
      group: groupId,
      createdBy: req.user._id,
      imageUrl,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all notes for a group
export const getNotes = async (req, res) => {
  const { groupId } = req.params;

  try {
    const notes = await Note.find({ group: groupId }).populate('createdBy', 'name email');
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;

  try {
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    // 🔥 Ownership check BEFORE update
    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this note' });
    }

    // Now update fields
    if (title) note.title = title;
    if (content) note.content = content;
    if (imageUrl) note.imageUrl = imageUrl;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    // 🔥 Ownership check BEFORE delete
    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this note' });
    }

    await note.deleteOne();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

