import mongoose from "mongoose";

const NotesSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("NoteBook", NotesSchema);
