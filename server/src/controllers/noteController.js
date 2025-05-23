import Note from "../models/Note.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

// Helper function to determine Cloudinary resource type from MIME type
const getCloudinaryResourceType = (mimeType) => {
  if (!mimeType) return "raw"; // default fallback
  if (mimeType.startsWith("image/")) return "image";
  // For all other types (pdf, doc, ppt, xls, md, txt, etc.), use 'raw'
  return "raw";
};

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content, groupId } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const cloudinaryResourceType = getCloudinaryResourceType(
      req.file?.mimetype
    );

    const note = await Note.create({
      title,
      content,
      group: groupId,
      createdBy: req.user._id,
      fileUrl,
      fileType: req.file?.mimetype,
      fileName: req.file?.originalname,
      cloudinaryPublicId: req.file?.filename,
      cloudinaryResourceType,
    });

    console.log("Uploaded file info:", req.file);

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all notes for a group
export const getNotes = async (req, res) => {
  const { groupId } = req.params;

  try {
    const notes = await Note.find({ group: groupId }).populate(
      "createdBy",
      "name email"
    );
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const fileUrl = req.file ? req.file.path : undefined;

  try {
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this note" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (fileUrl) {
      note.fileUrl = fileUrl;
      note.fileType = req.file?.mimetype;
      note.fileName = req.file?.originalname;
      note.cloudinaryResourceType = getCloudinaryResourceType(
        req.file?.mimetype
      );
    }

    const updatedNote = await note.save();
    const populatedNote = await updatedNote.populate("createdBy", "name email");
    res.status(200).json(populatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this note" });
    }

    // 🧹 Clean up Cloudinary file, pass correct resource type
    if (note.cloudinaryPublicId) {
      await deleteFromCloudinary(
        note.cloudinaryPublicId,
        note.cloudinaryResourceType || "raw"
      );
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
