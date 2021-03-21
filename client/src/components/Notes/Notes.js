import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Notes.css";

import Note from "../Note";
import AddNew from "../AddNew/AddNew";
import { Add, PlusOneTwoTone } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [openAdd, setOpenAdd] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios
      .get("/notes")
      .then((response) => {
        let arr = response.data;
        setNotes(arr.reverse());
      })
      .catch((error) => console.log(error));
  }
  const addNote = async (note) => {
    await axios
      .post("/notes/save", note)
      .then((response) => {})
      .catch(() => {
        console.log("Internal server error");
      });
    fetchNotes();
  };
  const deleteNote = async (id) => {
    await axios
      .delete("/notes/delete/" + id)
      .then((response) => {
        const note = {
          title: response.data.data.title,
          content: response.data.data.content,
        };
        console.log(note);
        axios
          .post("/trash/save", note)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(deletedNote);
    fetchNotes();
  };

  const addToSaved = async (id) => {
    let note = {};
    await axios
      .delete("/notes/delete/" + id)
      .then((response) => {
        note = {
          title: response.data.data.title,
          content: response.data.data.content,
        };
      })
      .catch((error) => {
        console.log("error->", error);
      });
    console.log(note);
    await axios
      .post("/saved/save", note)
      .then((response) => fetchNotes())
      .catch((err) => console.log(err));
    fetchNotes();
  };

  const editNote = (id, title, content) => {
    setTitle(title);
    setContent(content);
    setIdToEdit(id);
    setOpenEdit(true);
    setOpenAdd(false);
  };
  const saveEditted = async ({ title, content }) => {
    console.log();
    const note = {
      id: idToEdit,
      title,
      content,
    };
    await axios
      .put("/notes/edit/" + idToEdit, note)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    fetchNotes();
  };
  const closeWindow = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div className="notes">
      {openAdd && (
        <AddNew
          onAddNote={(note) => {
            addNote(note);
          }}
          titleToEdit={title}
          contentToEdit={content}
        />
      )}
      {openEdit && (
        <AddNew
          onAddNote={(note) => {
            saveEditted(note);
            closeWindow();
          }}
          titleToEdit={title}
          contentToEdit={content}
        />
      )}
      <ResponsiveMasonry
        style={{ width: "100%" }}
        columnsCountBreakPoints={breakpointColumnsObj}
      >
        <Masonry>
          {notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              onSaved={addToSaved}
              // onCompleted={addToCompleted}
              onEdit={editNote}
              time={note.createdAt}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Notes;
