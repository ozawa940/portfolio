import React from "react";
import {Box, Typography} from "@material-ui/core";
import DebateListContainer from "./DebateListContainer";
import DebateStyle from '../../style/Debate.module.scss'
import AppStyle from "../../style/App.module.scss"
import CreateDebateContainer from "../debate/CreateDebateContainer";


const Main = () => {
  return (
    <Box className={AppStyle.main}>
      <CreateDebateContainer />
      {/*<Box>*/}
      {/*  <Typography component="h2">Hot Debate List</Typography>*/}
      {/*  <DebateListContainer />*/}
      {/*</Box>*/}
      <Box className={DebateStyle.debate}>
        <div className={DebateStyle.debateTitle}>
          <Typography variant="h2">最近のルームリスト</Typography>
        </div>
        <DebateListContainer />
      </Box>
    </Box>
  )
}

export default Main;
