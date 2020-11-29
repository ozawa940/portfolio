import React from "react";
import {Box, Typography} from "@material-ui/core";
import DebateListContainer from "./DebateListContainer";

const Main = () => {
  return (
    <Box display="flex">
      {/*<Box>*/}
      {/*  <Typography component="h2">Hot Debate List</Typography>*/}
      {/*  <DebateListContainer />*/}
      {/*</Box>*/}
      <Box>
        <Typography component="h2">Recent Debate List</Typography>
        <DebateListContainer />
      </Box>
    </Box>
  )
}

export default Main;
