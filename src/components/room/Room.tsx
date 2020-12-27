import React, {useState} from "react";
import {Box, Button, IconButton, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {DebateInfo} from "../../store/debate/DebateReducer";
import {makeStyles} from "@material-ui/core/styles";
import DebateContainer from "../debate/DebateContainer";
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import CreateDebateModal from "../modal/CreateDebateModal";
import {CreateDebateParamType} from "../../utils/api/requestTypes";

type RoomParamType = {
  recentDebate: DebateInfo
  childDebateList: DebateInfo[],
  showDebateHandler: (isHome: boolean, debateNo: number) => void,
  addDebateHandler: (param: CreateDebateParamType, callback: any) => void
}

type ChildRoomParamType = {
  debateNo: number,
  debateName: string,
  debateDescribe: string,
  showChildDebateHandler: (isHome: boolean, debateNo: number) => void
}

const useStyle = makeStyles(({
  roomName : {
    fontSize: "2em",
  },
  roomHeader: {
    backgroundColor: "#81c784",
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
  },
  subRoomBtn: {
    marginLeft: "1em"
  }
}))

const ChildRoom = (props: ChildRoomParamType) => {
  const classes = useStyle();
  return (
    <ListItem button className={classes.childRoom} onClick={() => props.showChildDebateHandler(false, props.debateNo)}>
      <ListItemText primary={props.debateName} secondary={props.debateDescribe} />
    </ListItem>
  )
}

const Room = (props: RoomParamType) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false)
  const closeHandler = () => {
    setOpen(false)
  }

  const openHandler = () => {
    setOpen(true)
  }

  return (
    <Box display="flex" flexDirection="column" className={classes.room}>
      <Box className={clsx( {
        [classes.toParentBtn]: true
      })}>
        <Button onClick={() => props.showDebateHandler(!props.recentDebate.parentDebateNo, props.recentDebate.parentDebateNo)}>
          {!props.recentDebate.parentDebateNo ? "ホームに移動" : "親ルームに移動"}
        </Button>
      </Box>
      <Box display="flex" className={classes.roomHeader}>
        <Typography className={classes.roomName}>{props.recentDebate.debateName}</Typography>
      </Box>
      <Box display="flex" className={classes.roomDescribe}>
        <Typography>{props.recentDebate.debateDescribe}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" className={clsx({
        [classes.threadTitle]: props.childDebateList.length > 0,
        [classes.hidden]: !!props.recentDebate.parentDebateNo
      })} >
        <Typography className={classes.threadName}>サブルーム</Typography>
        <Button
          variant="contained" color="primary" onClick={openHandler}
          endIcon={<AddIcon />} className={classes.subRoomBtn} >
          追加
        </Button>
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
      <CreateDebateModal open={open} closeHandler={closeHandler} addDebateHandler={props.addDebateHandler} parentDebateNo={props.recentDebate.debateNo} />
    </Box>
  )
}

export default Room;
