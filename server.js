import express from "express";
import cors from "cors";
// import Notes from "./models/Notes.js";
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";
import router from "./routes/api.js";
//app config
const app = express();
const PORT = process.env.PORT || 3000;

//middleware

// var corsOptions = {
//   origin: `http://localhost:${PORT}`,
// };
app.use(express.json());
app.use(cors());
app.use("/", router);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//now please load my static html and css files for my express app, from my /dist directory
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
//DB config

const connection_url =
  process.env.MONGO_CONNECTION_URL ||
  "mongodb+srv://devDooot:Sw@pnil3149@cluster0.0mnuf.mongodb.net/notesDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//desgin database
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB is Hot");
});

//create collection
db.once("open", () => {
  // const NotesCollection = db.collection("Notes");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
