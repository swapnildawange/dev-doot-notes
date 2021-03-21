import React from "react";
import "../styles/Note.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Button, IconButton } from "@material-ui/core";
import axios from "axios";
import { NoteAdd, TurnedInNot } from "@material-ui/icons";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Moment from "react-moment";
function Note({
  id,
  title,
  content,
  onDelete,
  onSaved,
  onCompleted,
  onEdit,
  isSaved,
  time,
}) {
  const handleDelete = (e) => {
    onDelete(id);
  };
  const handleSaved = (e) => {
    onSaved(id);
  };
  const handleCompleted = (e) => {
    onCompleted(id);
  };
  const handleEdit = (e) => {
    onEdit(id, title, content);
  };

  return (
    <div className="note">
      <h3>{title}</h3>
      {/* <hr className="note__underline" /> */}
      <div className="note__content">
        <p>{content}</p>
        <div className="note__time">
          <Moment format="DD MMM YYYY">{time}</Moment>
        </div>
        <div className="note__onHoverContainer">
          <div className="note__buttons">
            <IconButton onClick={handleSaved}>
              {isSaved ? <BookmarkIcon color="white" /> : <TurnedInNot />}
            </IconButton>

            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <hr className="note__underline" />
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
