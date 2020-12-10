import React from "react";
import CreateDebate from "./CreateDebate";
import requestMap from "../../utils/api/requestMap";
import {useDispatch} from "react-redux";
import {GetRecentDebateList} from "../../store/debate/DebateActions";

const CreateDebateContainer = () => {
  const dispatch = useDispatch();

  const createDebateParam = {
    createThreadHandler: (threadName: string) => {
      const threadParam = {
        threadName: threadName,
        threadType: "ROOM",
        threadStatus: "PUBLIC"
      }
      requestMap.createThread(threadParam).then((res) => {
        dispatch(GetRecentDebateList())
      })
    }
  }

  return (
    <CreateDebate {...createDebateParam} />
  )
}

export default CreateDebateContainer;
