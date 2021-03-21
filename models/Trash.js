import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timeStamps: true }
);

export default mongoose.model("Trash", TrashSchema);
