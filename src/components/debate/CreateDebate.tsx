import React, {ChangeEvent, useState} from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import DebateStyle from '../../style/Debate.module.scss'
import {makeStyles} from "@material-ui/core/styles";

type CreateDebateProps = {
  createDebateHandler: (form: any, callback: () => void) => void
}

const useStyle = makeStyles(( {
  title: {
    fontSize: "2em"
  },
  inputTitle: {
    width: "10%",
    paddingRight: "1em",
  },
}))

const CreateDebate = (props: CreateDebateProps) => {
  const classes = useStyle();
  const [form, setForm] = useState({
    debateName: "",
    debateDescribe: ""
  })
  const clearForm = () => {
    setForm({
      debateName: "",
      debateDescribe: ""
    })
  }

  const changeFormHandler = (event: ChangeEvent<any>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setForm({...form, [name] : value});
  }

  return (
    <Box className={DebateStyle.createDebate} >
      <Typography className={classes.title}>新規ルーム作成</Typography>
      <div className={DebateStyle.createDebateWrap}>
        <Typography variant="h3" className={classes.inputTitle}>ルーム名</Typography>
        <TextField name="debateName" color="primary" value={form.debateName} onChange={changeFormHandler} />
      </div>
      <div className={DebateStyle.createDebateWrap}>
        <Typography variant="h3" className={classes.inputTitle}>詳細</Typography>
        <TextField name="debateDescribe" color="primary" value={form.debateDescribe} onChange={changeFormHandler} />
      </div>
      <Button variant="contained" color="primary" onClick={() => props.createDebateHandler(form, clearForm)}>登録</Button>
    </Box>
  )
}

export default CreateDebate;
