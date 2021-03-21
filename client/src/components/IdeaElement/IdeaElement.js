import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Moment from "react-moment";
import "./IdeaElement.css";
function IdeaElement({ id, title, content, time }) {
  let { ideaID } = useParams(id);
  return (
    <NavLink
      to={`/idea/${id}`}
      activeClassName="my-active"
      // style={{ textDecoration: "underline", fontSize: "1.22rem" }}
    >
      <div className="ideaElement">
        <div className="ideaElement__left">
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
        <div className="ideaElement__right">
          <Moment format="D MMM ">{time}</Moment>
        </div>
      </div>
    </NavLink>
  );
}

export default IdeaElement;
