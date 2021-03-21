import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNew from "../AddNew/AddNew";
import Note from "../Note";
import "./Saved.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
function Saved() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const fetchNotes = async () => {
    await axios
      .get("/saved")
      .then((response) => {
        let arr = response.data;
        setNotes(arr.reverse());
      })
      .catch((error) => console.log(error));
  };
  const deleteNote = async (id) => {
    await axios
      .delete("/saved/delete/" + id)
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

    fetchNotes();
  };

  const moveToNotes = async (id) => {
    let note = {};
    await axios
      .delete("/saved/delete/" + id)
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

  // const addToCompleted = async (id) => {
  //   const savedNote = await deleteNote(id);
  //   const note = {
  //     id: savedNote.id,
  //     title: savedNote.title,
  //     content: savedNote.content,
  //   };
  //   await axios
  //     .post("http://localhost:3000/completed/save", note)
  //     .then((response) => fetchNotes())
  //     .catch((err) => console.log(err));
  // };
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
      .put("/saved/edit/" + idToEdit, note)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    fetchNotes();
  };
  const closeWindow = () => {
    setOpenEdit(false);
  };

  return (
    <div className="saved">
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
              isSaved={true}
              time={note.createdAt}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Saved;
