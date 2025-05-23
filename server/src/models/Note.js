import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // Cloudinary URL for uploaded file
    },
    fileType: {
      type: String, // MIME type (e.g., application/pdf, image/png)
    },
    fileName: {
      type: String, // Original file name
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cloudinaryPublicId: {
      type: String, // Needed for file deletion
    },
    cloudinaryResourceType: {
      type: String,
      enum: ['image', 'raw'],
      default: 'raw',
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
