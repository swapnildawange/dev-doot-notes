import Express from "express";
import NoteBook from "../models/Notes.js";
import Saved from "../models/Saved.js";
import Idea from "../models/Idea.js";
import Trash from "../models/Trash.js";
const router = Express.Router();

//notes
router.get("/notes", (req, res) => {
  NoteBook.find((err, notes) => {
    if (err) {
      console.log(notes);
      res.status(500).send(err);
    } else {
      res.status(200).send(notes);
    }
  });
});
router.post("/notes/save", (req, res) => {
  const data = req.body;
  const newNote = new NoteBook(data);
  console.log(data);
  newNote.save((error) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry,Internal server error" });
    }
    return res.json({ msg: "Your data has been saved" });
  });
});

router.delete("/notes/delete/:id", (req, res) => {
  NoteBook.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) {
      res.status(400).json({ success: false, error: err });
      return;
    }
    if (!note) {
      res.status(404).json({ success: false, error: "Note not found" });
      return;
    }
    return res.status(200).json({ success: true, data: note });
  }).catch((err) => {
    console.log(err);
  });
});

router.put("/notes/edit/:id", (req, res) => {
  let newvalues = {
    $set: { title: req.body.title, content: req.body.content },
  };
  NoteBook.findByIdAndUpdate({ _id: req.params.id }, newvalues, (err, note) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ data: note });
    }
  });
});

//saved data
router.get("/saved", (req, res) => {
  Saved.find((err, notes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(notes);
    }
  });
});
router.post("/saved/save", (req, res) => {
  const data = req.body;
  const newNote = new Saved(data);
  // console.log(data);
  newNote.save((error) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry,Internal server error" });
    }
    return res.json({ msg: "Your data has been saved" });
  });
});
router.put("/saved/edit/:id", (req, res) => {
  let newvalues = {
    $set: { title: req.body.title, content: req.body.content },
  };
  Saved.findByIdAndUpdate({ _id: req.params.id }, newvalues, (err, note) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ data: note });
    }
  });
});

router.delete("/saved/delete/:id", (req, res) => {
  console.log(req.params.id);
  Saved.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, msg: "Sorry,Internal server error" });
    } else if (!note) {
      res.status(404).send({ success: false, msg: "Note not found" });
    } else {
      res.status(200).send({ success: true, data: note });
    }
  });
});

router.delete("/saved/deleteall", (req, res) => {
  Saved.deleteMany({}, (err, note) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, msg: "Sorry,Internal server error" });
    } else if (!note) {
      res.status(404).send({ success: false, msg: "Note not found" });
    } else {
      res.status(200).send({ success: true, data: note });
    }
  });
});

//idea

router.get("/idea", (req, res) => {
  Idea.find((err, notes) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(notes);
    }
  });
});
router.put("/idea/find/:id", (req, res) => {
  Idea.findById({ _id: req.params.id }, (err, note) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(note);
    }
  });
});

router.post("/idea/save", (req, res) => {
  const data = req.body;
  console.log("api", data);
  const newIdea = new Idea(data);
  newIdea.save((err, note) => {
    if (err) {
      res.status(500).send("Cannot add to ideas");
    } else {
      res.status(200).send("New Idea added successfully");
    }
  });
});

router.delete("/idea/delete/:id", (req, res) => {
  console.log(req.params.id);
  Idea.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, msg: "Sorry,Internal server error" });
    } else if (!note) {
      res.status(404).send({ success: false, msg: "Note not found" });
    } else {
      res.status(200).send({ success: true, data: note });
    }
  });
});
router.post("/idea/deleteall", (req, res) => {
  Idea.deleteMany({}, (err, note) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, msg: "Sorry,Internal server error" });
    } else if (!note) {
      res.status(404).send({ success: false, msg: "Note not found" });
    } else {
      res.status(200).send({ success: true, data: note });
    }
  });
});

router.put("/idea/edit/:id", (req, res) => {
  let newvalues = {
    $set: { title: req.body.title, content: req.body.content },
  };
  Idea.findByIdAndUpdate({ _id: req.params.id }, newvalues, (err, note) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ data: note });
    }
  });
});

//trash

router.get("/trash", (req, res) => {
  Trash.find((err, notes) => {
    if (err) {
      console.log(notes);
      res.status(500).send(err);
    } else {
      res.status(200).send(notes);
    }
  });
});
router.post("/trash/save", (req, res) => {
  const data = req.body;
  const newNote = new Trash(data);
  console.log(data);
  newNote.save((error) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry,Internal server error" });
    }
    return res.json({ msg: "Your data has been saved" });
  });
});

router.delete("/trash/delete/:id", (req, res) => {
  Trash.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) {
      res.status(400).json({ success: false, error: err });
      return;
    }
    if (!note) {
      res.status(404).json({ success: false, error: "Note not found" });
      return;
    }
    return res.status(200).json({ success: true, data: note });
  }).catch((err) => {
    console.log(err);
  });
});

router.put("/trash/edit/:id", (req, res) => {
  let newvalues = {
    $set: { title: req.body.title, content: req.body.content },
  };
  Trash.findByIdAndUpdate({ _id: req.params.id }, newvalues, (err, note) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ data: note });
    }
  });
});

export default router;
