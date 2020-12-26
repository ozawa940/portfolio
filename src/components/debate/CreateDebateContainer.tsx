import React from "react";
import CreateDebate from "./CreateDebate";
import requestMap from "../../utils/api/requestMap";
import {useDispatch} from "react-redux";
import {GetRecentDebateList} from "../../store/debate/DebateActions";

const CreateDebateContainer = () => {
  const dispatch = useDispatch();

  const createDebateParam = {
    createDebateHandler: (form: any) => {
      const param = {
        debateName: form.debateName,
        debateDescribe: form.debateDescribe,
        debateType: "DEBATE",
        debateStatus: "PUBLIC",
      }
      requestMap.createDebate(param).then((res) => {
        dispatch(GetRecentDebateList())
      })
    }
  }

  return (
    <CreateDebate {...createDebateParam} />
  )
}

export default CreateDebateContainer;
