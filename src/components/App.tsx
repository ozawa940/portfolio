import React from "react";
import HeaderContainer from "./HeaderContainer";
import ContentsContainer from "./ContentsContainer";
import classes from "../style/App.module.scss"
import {Box} from "@material-ui/core";

const App = () => {
  return (
    <Box className={classes.app} display="flex" flexDirection="column">
      <HeaderContainer />
      <ContentsContainer />
    </Box>
  )
}

export default App;
