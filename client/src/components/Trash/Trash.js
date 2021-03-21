import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Trash.css";
import Note from "../Note";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AddNew from "../AddNew/AddNew";
function Trash() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios
      .get("/trash")
      .then((response) => setNotes(response.data))
      .catch((error) => console.log(error));
  }
  // const addNote = async (newNote) => {
  //   const note = {
  //     title: newNote.title,
  //     content: newNote.content,
  //   };
  //   await axios
  //     .post("/save", note)
  //     .then((response) => {
  //       fetchNotes();
  //     })
  //     .catch(() => {
  //       console.log("Internal server error");
  //     });
  // };
  const deleteNote = async (id) => {
    await axios
      .delete("/trash/delete/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error->", error);
      });
    fetchNotes();
    // console.log(deletedNote);
  };

  const moveToNotes = async (id) => {
    let note = {};
    await axios
      .delete("/trash/delete/" + id)
      .then((response) => {
        note = {
          title: response.data.data.title,
          content: response.data.data.content,
        };
        // fetchNotes();
      })
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(note);

    await axios
      .post("/notes/save", note)
      .then((response) => fetchNotes())
      .catch((err) => console.log(err));
    fetchNotes();
  };


  const editNote = (id, title, content) => {
    setTitle(title);
    setContent(content);
    setIdToEdit(id);
    setOpenEdit(true);
  };
  const saveEditted = async ({ title, content }) => {
    console.log();
    const note = {
      id: idToEdit,
      title,
      content,
    };
    await axios
      .put("/trash/edit/" + idToEdit, note)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    fetchNotes();
  };
  const closeWindow = () => {
    setOpenEdit(false);
  };

  // console.log(notes);
  return (
    <div className="feed">
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
              onSaved={moveToNotes}
              onEdit={editNote}
              isSaved={false}
              time={note.createdAt}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Trash;
