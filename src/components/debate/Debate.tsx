import React, {ChangeEvent, CSSProperties, useEffect, useRef, useState} from "react";
import {Box, Button, ListItem, ListItemText, TextField, Typography} from "@material-ui/core";
import {MessageInfo, UserInfo} from "../../store/debate/DebateReducer";
import {FixedSizeList, ListChildComponentProps} from "react-window"
import SendIcon from '@material-ui/icons/Send';

export type DebateMessageProps = {
  message: MessageInfo,
  userName: string,
  style : CSSProperties
}

const DebateMessage = (props: DebateMessageProps) => {
  return (
    <ListItem alignItems="flex-start" style={props.style}>
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
  userNoList: UserInfo[],
  sendMessage: (message: string) => void
}

const renderRow = (props: ListChildComponentProps) => {
  const debateProps: DebateProps = props.data;
  const message = debateProps.messageList[props.index]
  const userName = debateProps.userNoList.find(user => user.userNo === message.userNo)

  return (
    <React.Fragment>
        <DebateMessage message={message}
                       userName={ userName ? userName.userName : "ANONYMOUS"}
                       style={props.style}
        />
    </React.Fragment>
  )
}

const Debate = (props: DebateProps) => {

  const ref = useRef<FixedSizeList>(null)
  const [initFlg, setInitFlg] = useState(true)
  useEffect(() => {
    if (initFlg) {
      // TODO: set scroll index
      ref.current?.scrollToItem(props.messageList.length);
      setInitFlg(false);
    }
  }, [initFlg, ref])

  const [message, setMessage] = useState("")
  const changeMessageHandler = (event: ChangeEvent<any>) => {
    setMessage(event.target.value)
  }

  return (
    <Box display="flex" flexDirection="column">
      <FixedSizeList
        itemSize={80}
        height={600}
        itemCount={props.messageList.length}
        width={600}
        itemData={props}
        ref={ref}
      >
        {renderRow}
      </FixedSizeList>
      <TextField
        label="Input message"
        multiline
        variant="filled"
        onChange={changeMessageHandler}
      />
      <Button
        startIcon={<SendIcon />}
        color="primary"
        variant="contained"
        onClick={() => {
          props.sendMessage(message);
          setMessage("")
        }}
      >Send</Button>
    </Box>
  )
}

export default Debate;
