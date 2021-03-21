import mongoose from "mongoose";

const IdeaSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Idea", IdeaSchema);
