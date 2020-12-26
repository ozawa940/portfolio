import React from "react";
import {Box, Button, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {DebateInfo} from "../../store/debate/DebateReducer";
import {makeStyles} from "@material-ui/core/styles";
import DebateContainer from "../debate/DebateContainer";
import clsx from "clsx";

type RoomParamType = {
  recentDebate: DebateInfo
  childDebateList: DebateInfo[],
  showDebateHandler: (debateNo: number) => void,
}

type ChildRoomParamType = {
  debateNo: number,
  debateName: string,
  debateDescribe: string,
  showChildDebateHandler: (debateNo: number) => void
}

const useStyle = makeStyles(({
  roomName : {
    fontSize: "2em",
  },
  roomHeader: {
    backgroundColor: "#81c784",
    paddingBottom: "2em",
    justifyContent: "center"
  },
  room: {
    width: "80%",
    height: "80%"
  },
  roomDescribe: {
    paddingBottom: "4em",
    justifyContent: "center"
  },
  childRoom: {
    backgroundColor: "#dedede",
  },
  thread : {
    paddingTop: "1em",
  },
  threadTitle: {
    paddingBottom: "1em"
  },
  threadName: {
    fontSize: "2em"
  },
  toParentBtn: {
    paddingBottom: "1em"
  },
  hidden: {
    display: "none"
  }
}))

const ChildRoom = (props: ChildRoomParamType) => {
  const classes = useStyle();
  return (
    <ListItem button className={classes.childRoom} onClick={() => props.showChildDebateHandler(props.debateNo)}>
      <ListItemText primary={props.debateName} secondary={props.debateDescribe} />
    </ListItem>
  )
}

const Room = (props: RoomParamType) => {
  const classes = useStyle();
  return (
    <Box display="flex" flexDirection="column" className={classes.room}>
      <Box className={clsx( {
        [classes.hidden]: !props.recentDebate.parentDebateNo,
        [classes.toParentBtn]: true
      })}>
        <Button onClick={() => props.showDebateHandler(props.recentDebate.parentDebateNo)}>親ルームに移動</Button>
      </Box>
      <Box display="flex" className={classes.roomHeader}>
        <Typography className={classes.roomName}>{props.recentDebate.debateName}</Typography>
      </Box>
      <Box display="flex" className={classes.roomDescribe}>
        <Typography>{props.recentDebate.debateDescribe}</Typography>
      </Box>
      <List>
      {
        props.childDebateList.map((info: DebateInfo) => (
          <ChildRoom debateName={info.debateName} debateNo={info.debateNo}
                     debateDescribe={info.debateDescribe} showChildDebateHandler={props.showDebateHandler} />
        ))
      }
      </List>
      <Box className={classes.thread}>
        <Box className={classes.threadTitle}>
          <Typography className={classes.threadName}>メインスレッド</Typography>
        </Box>
        <DebateContainer />
      </Box>
    </Box>
  )
}

export default Room;
