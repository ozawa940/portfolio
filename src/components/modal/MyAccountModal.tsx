import React from "react";
import {Box, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {Account} from "../../store/token/TokenReducer";
import {makeStyles} from "@material-ui/core/styles";

type MyAccountModalPropsType = {
  open: boolean,
  closeHandler: () => void,
  account: Account
}

const useStyle = makeStyles({
  title: {
    paddingRight: "1em",
  }
})

const MyAccountModal = (props: MyAccountModalPropsType) => {
  const classes = useStyle()
  const userId = props.account ? props.account.userId : ""
  const userName = props.account ? props.account.userName : ""
  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
      <DialogTitle>アカウント情報</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="row">
          <Typography className={classes.title}>アカウントID:</Typography>
          <Typography>{userId}</Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <Typography className={classes.title}>アカウント名:</Typography>
          <Typography>{userName}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default MyAccountModal;
