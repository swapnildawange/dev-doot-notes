import { Button, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Idea.css";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";
import IdeaElement from "../IdeaElement/IdeaElement";
import IdeaPad from "./IdeaPad/IdeaPad.js";
import ideaIllustration from "./ideaIllustration.svg";
function Idea() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [ideas, setIdeas] = useState([]);
  let { ideaID } = useParams();

  useEffect(() => {
    fetchIdeas();
  }, []);
  const fetchIdeas = async () => {
    await Axios.get("/idea")
      .then((response) => {
        let arr = response.data;
        setIdeas(arr.reverse());
      })
      .catch((error) => console.log(error));
  };

  const addIdea = async ({ title, content }) => {
    const idea = {
      title,
      content,
    };
    await Axios.post("/idea/save", idea)
      .then((response) => {
        console.log(response);
        setContent("");
        setTitle("");
      })
      .catch((err) => console.log(err));
    fetchIdeas();
    closeAddWindow();
  };

  const closeAddWindow = () => {
    setOpenAdd(false);
  };
  const deleteAllIdeas = async () => {
    await Axios.post("/idea/deleteall", { data: {} })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchIdeas();
  };
  const updateIdea = async ({ id, title, content }) => {
    await Axios.put("/idea/edit/" + id, {
      title,
      content,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchIdeas();
  };
  const deleteIdea = async (id) => {
    await Axios.delete("/idea/delete/" + id)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchIdeas();
  };

  return (
    <BrowserRouter>
      <div className="idea">
        <div className="idea__left">
          <div className="idea__left__body">
            <div className="idea__left__header">
              <h1>All Ideas</h1>
              <IconButton
                className="idea__deleteAllBtn"
                onClick={deleteAllIdeas}
              >
                <Trash />
              </IconButton>
            </div>
            <div className="idea__left__feed">
              <div className="idea__left__feedBody">
                {ideas.map((idea) => (
                  <IdeaElement
                    key={idea._id}
                    id={idea._id}
                    title={idea.title}
                    content={idea.content}
                    time={idea.updatedAt}
                  />
                ))}
              </div>
            </div>
            <div className="idea__left__footer">
              <div className="idea__footer__add">
                <Button
                  onClick={() => setOpenAdd(true)}
                  className="idea__footer__addBtn"
                >
                  <AddCircleOutlineIcon />
                  <p className="idea__footer__addBtntext"> Add new Ideas</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="idea__right">
          {ideas.length || openAdd ? (
            <>
              {openAdd ? (
                <IdeaPad
                  onSaveIdea={addIdea}
                  onCancel={closeAddWindow}
                  isNew={true}
                />
              ) : (
                <Route path="/idea/:ideaID">
                  <IdeaPad
                    onSaveIdea={updateIdea}
                    onCancel={deleteIdea}
                    isNew={false}
                  />
                </Route>
              )}
            </>
          ) : (
            <div className="idea__landingPage">
              <img className="idea__image" src={ideaIllustration} alt="Idea" />
              <h1>Oops,No ideas!!</h1>
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Idea;
