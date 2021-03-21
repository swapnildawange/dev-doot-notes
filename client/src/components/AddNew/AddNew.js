import { Fab, Zoom } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import "./AddNew.css";
function AddNew({ onAddNote, onClose, titleToEdit, contentToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const handleAddnote = async (e) => {
    e.preventDefault();
    if (title && content) {
      onAddNote({ title: title, content: content });
      setTitle("");
      setContent("");
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    setTitle(titleToEdit);
    setContent(contentToEdit);
  }, [titleToEdit, contentToEdit]);

  return (
    <div className="AddNew">
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          value={content}
          onClick={() => setIsExpanded(true)}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={(e) => handleAddnote(e)}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default AddNew;
