import React from "react";
import CreateDebate from "./CreateDebate";
import requestMap from "../../utils/api/requestMap";
import {useDispatch} from "react-redux";
import {GetRecentDebateList} from "../../store/debate/DebateActions";

const CreateDebateContainer = () => {
  const dispatch = useDispatch();

  const createDebateParam = {
    createDebateHandler: (form: any, callback: () => void) => {
      const param = {
        debateName: form.debateName,
        debateDescribe: form.debateDescribe,
        debateType: "DEBATE",
        debateStatus: "PUBLIC",
        voteType: "FOR_AND_AGAINST"
      }
      requestMap.createDebate(param).then((res) => {
        setTimeout(() => {dispatch(GetRecentDebateList())}, 5000)
        alert("ルームが作成されました")
        callback()
      })
    }
  }

  return (
    <CreateDebate {...createDebateParam} />
  )
}

export default CreateDebateContainer;
