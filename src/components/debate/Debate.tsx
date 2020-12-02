import React from "react";
import {Box, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {MessageInfo, UserInfo} from "../../store/debate/DebateReducer";

export type DebateMessageProps = {
  message: MessageInfo,
  userName: string
}

const DebateMessage = (props: DebateMessageProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={props.userName}
        secondary={
          <Typography component="h3">{props.message.message}</Typography>
        }
      >
      </ListItemText>
    </ListItem>
  )
}

export type DebateProps = {
  messageList: MessageInfo[],
  userNoList: UserInfo[]
}

const Debate = (props: DebateProps) => {
  return (
    <Box display="flex">
      <List>
        {
          props.messageList.map(message => {
            const userName = props.userNoList.find(user => user.userNo === message.userNo)
            return (
              <DebateMessage message={message}
                             userName={ userName ? userName.userName : "ANONYMOUS"} />
            )
          })
        }
      </List>
    </Box>
  )
}

export default Debate;
