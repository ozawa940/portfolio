import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";

type NoticeModalPropsType = {
  open: boolean,
  actionHandler: () => void,
  closeHandler: () => void,
  message: string
}

const NoticeModal = (props: NoticeModalPropsType) => {
  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
      <DialogTitle>通知</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>{props.message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.actionHandler}>
          OK
        </Button>
        <Button onClick={props.closeHandler}>
          キャンセル
        </Button>
      </DialogActions>

    </Dialog>
  )
}

export default NoticeModal;
