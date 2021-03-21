import React, { useEffect, useState } from "react";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import ClearAllIcon from "@material-ui/icons/ClearAll";
//
import "./IdeaPad.css";
import { Button, Input, TextField, withStyles } from "@material-ui/core";
import Axios from "axios";
import { useParams } from "react-router";
import { Cancel, Delete } from "@material-ui/icons";

function IdeaPad(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let { ideaID } = useParams(null);
  useEffect(() => {
    if (ideaID) {
      fetchIdea();
    } else {
      console.log("no idea");
    }
  }, [ideaID]);

  const fetchIdea = async () => {
    await Axios.put("/idea/find/" + ideaID)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((err) => console.log(err));
  };
  const handleSaveIdea = () => {
    if (title !== "" && content !== "") {
      const idea = {
        id: ideaID,
        title,
        content,
      };
      props.onSaveIdea(idea);
    } else {
      alert("Enter title and text to update");
    }
  };

  const handleCancel = () => {
    props.onCancel(ideaID);
    setTitle("");
    setContent("");
  };
  return (
    <div className="ideaPad">
      <div className="ideaPad__container">
        <div className="ideaPad__header ideaPad__element">
          <TextField
            fullWidth
            multiline="true"
            placeholder="Enter title ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        </div>
        <div className="ideaPad__body ideaPad__element">
          <TextField
            fullWidth
            funllHeight
            multiline="true"
            placeholder="Write your idea here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        </div>
        <div className="ideaPad__footer  ">
          <StyledSaveButton
            variant="outlined"
            size="large"
            onClick={handleSaveIdea}
            startIcon={<SaveIcon />}
          >
            {props.isNew ? "save" : "update"}
          </StyledSaveButton>
          <StyledCancelButton
            variant="contained"
            size="large"
            className="cancelBtn"
            onClick={handleCancel}
            startIcon={props.isNew ? <Cancel /> : <Delete />}
          >
            {props.isNew ? "cencel" : "delete"}
          </StyledCancelButton>
        </div>
      </div>
    </div>
  );
}

export default IdeaPad;

const StyledCancelButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #457166 30%, #467267 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {},
})(Button);

const StyledSaveButton = withStyles({
  root: {
    "&:clicked": {
      backgroundColor: "#f58634",
    },
    background: "transparent",
    borderColor: "#f58634",
    borderRadius: 3,
    border: "1",
    color:"white",
    height: 48,
    padding: "0 30px",
  },
  label: {
    color: "#f58634",
  },
})(Button);
