import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import DebateStyle from '../../style/Debate.module.scss'
import {DebateInfo} from "../../store/debate/DebateReducer";


export type DebateCardProps = {
  debateCard: DebateInfo,
  goToDebateHandler: (threadNo: number) => void
};

const DebateCard = (props: DebateCardProps) => {
  return (
    <Card className={DebateStyle.debateCard}>
      <CardContent>
        <Typography component="h2">{ props.debateCard.debateName }</Typography>
        <Typography component="h4">{ props.debateCard.debateDescribe}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.goToDebateHandler(props.debateCard.threadNo)}>
          ルームに入る
        </Button>
      </CardActions>
    </Card>
  )
}

export type DebateListProps = {
  debateList: DebateInfo[],
  goToDebateHandler: (thread: number) => void
}

const DebateList = (props: DebateListProps) => {

  return (
    <Box className={DebateStyle.debateList}>
      {
        props.debateList.map((card) => (
          <DebateCard debateCard={card} goToDebateHandler={props.goToDebateHandler}  />
        ))
      }
    </Box>
  )
}

export default DebateList;
