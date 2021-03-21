import mongoose from "mongoose";

const SavedSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Saved", SavedSchema);
