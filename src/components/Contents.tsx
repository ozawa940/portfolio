import React from "react";
import {Switch, Route} from "react-router-dom";
import MainContainer from "./main/MainContainer";
import LoginContainer from "./common/LoginContainer";
import ChatContainer from "./chat/ChatContainer";
import DebateContainer from "./debate/DebateContainer";
import {Box} from "@material-ui/core";
import app from "../style/App.module.scss"
import RoomContainer from "./room/RoomContainer";

const Contents = () => {
  return (
    <Box display="flex" className={app.contents}>
      <Switch>
        <Route path="/login">
          <LoginContainer />
        </Route>
        <Route path="/chat">
          <ChatContainer />
        </Route>
        <Route path="/room">
          <RoomContainer />
        </Route>
        <Route path="/debate">
          <DebateContainer />
        </Route>
        <Route path="/">
          <MainContainer />
        </Route>
      </Switch>
    </Box>
  )
}

export default Contents;
