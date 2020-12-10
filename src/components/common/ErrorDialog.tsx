import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

type ErrorDialogProps = {
  showErrorFlg: boolean,
  errorTitle: string,
  errorMsg: string,
  closeHandler: () => void
}

export const ErrorDialog = (props: ErrorDialogProps) => {
  return (
    <Dialog
      open={props.showErrorFlg}
      onClose={props.closeHandler}
    >
      <DialogTitle>{props.errorTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.errorMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeHandler}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
