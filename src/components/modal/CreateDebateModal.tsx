import React, {ChangeEvent, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@material-ui/core";
import {CreateDebateParamType} from "../../utils/api/requestTypes";
import {makeStyles} from "@material-ui/core/styles";


type CreateDebateModalParamType = {
  open: boolean,
  closeHandler: () => void,
  addDebateHandler: (param: CreateDebateParamType, callback: any) => void,
  parentDebateNo?: number
}

const useStyle = makeStyles({
  inputTitle: {
    width: "20%",
    paddingRight: "1em",
  },
})

const CreateDebateModal = (props: CreateDebateModalParamType) => {
  const classes = useStyle();

  const [form, setForm] = useState<CreateDebateParamType>({
    debateName: "",
    debateDescribe: "",
    debateType: "DEBATE",
    debateStatus: "PUBLIC",
    voteType: "FOR_AND_AGAINST"
  })

  const addDebateHandler = () => {
    props.addDebateHandler({...form, parentDebateNo: props.parentDebateNo}, props.closeHandler)
  }

  const changeFormHandler = (event: ChangeEvent<any>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setForm({...form, [name] : value})
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.closeHandler}
      fullWidth
    >
      <DialogTitle>ルーム作成</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" >
            <Typography className={classes.inputTitle}>ルーム名</Typography>
            <TextField name="debateName" value={form.debateName} onChange={changeFormHandler} />
          </Box>
          <Box display="flex" flexDirection="row" >
            <Typography className={classes.inputTitle}>ルーム詳細</Typography>
            <TextField name="debateDescribe" value={form.debateDescribe} onChange={changeFormHandler} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={addDebateHandler}>
          作成
        </Button>
        <Button onClick={props.closeHandler}>
          キャンセル
        </Button>
      </DialogActions>

    </Dialog>
  )
}

export default CreateDebateModal;
