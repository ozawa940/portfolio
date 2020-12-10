import React, {ChangeEvent, useState} from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import DebateStyle from '../../style/Debate.module.scss'
import {makeStyles} from "@material-ui/core/styles";

type CreateDebateProps = {
  createThreadHandler: (threadName: string) => void
}

const useStyle = makeStyles(( {
  title: {
    fontSize: "2em"
  },
  threadName: {
    paddingRight: "1em",
  }
}))

const CreateDebate = (props: CreateDebateProps) => {
  const classes = useStyle();
  const [threadName, setThreadName] = useState("")

  const changeFormHandler = (event: ChangeEvent<any>) => {
    setThreadName(event.target.value)
  }

  return (
    <Box className={DebateStyle.createDebate} >
      <Typography className={classes.title}>新規スレッド作成</Typography>
      <div className={DebateStyle.createDebateWrap}>
        <Typography variant="h3" className={classes.threadName}>スレッド名</Typography>
        <TextField name="threadName" color="primary" value={threadName} onChange={changeFormHandler} />
      </div>
      <Button variant="contained" color="primary" onClick={() => props.createThreadHandler(threadName)}>スレッド作成</Button>
    </Box>
  )
}

export default CreateDebate;
