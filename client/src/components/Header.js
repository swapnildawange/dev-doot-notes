import React from "react";
import "../styles/Header.css";
import {
  House,
  FolderSimplePlus,
  Lightbulb,
  Note,
  Trash as Bin,
} from "phosphor-react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Trash from "./Trash/Trash";

import { Archive, ArchiveTwoTone, SaveRounded } from "@material-ui/icons";
import Notes from "./Notes/Notes";
import Saved from "./Saved/Saved";
import Idea from "./Idea/Idea";
function Header() {
  return (
    <BrowserRouter>
      <div className="header">
        <div className="header__title">
          <img src="/images/writing.svg" alt="note icon" />
          <h1>Notes</h1>
        </div>

        <div className="header__menu">
          <ul>
            <li>
              <NavLink to="/notes" activeClassName="my-active">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Note />
                  </span>
                  <p className="menu__text">Notes</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/idea" activeClassName="my-active">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Lightbulb />
                  </span>
                  <p className="menu__text">Ideas</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved" activeClassName="my-active">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Archive />
                  </span>
                  <p className="menu__text">Saved</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/trash" activeClassName="my-active">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Bin size={26} />
                  </span>
                  <p className="menu__text">Trash</p>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Switch>
        <Route exact path="/notes" component={Notes}></Route>
        <Route exact path="/idea" component={Idea}></Route>
        <Route exact path="/saved" component={Saved}></Route>
        <Route exact path="/trash" component={Trash}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
