import React from "react";
import CreateDebate from "./CreateDebate";
import requestMap from "../../utils/api/requestMap";
import {useDispatch, useSelector} from "react-redux";
import {GetRecentDebateList} from "../../store/debate/DebateActions";
import {RootState} from "../../store";

const CreateDebateContainer = () => {
  const dispatch = useDispatch();
  const accessToken: any = useSelector<RootState>(state => {
    return state.tokenReducer.accessToken
  });

  const createDebateParam = {
    createDebateHandler: (form: any, callback: () => void) => {
      const param = {
        debateName: form.debateName,
        debateDescribe: form.debateDescribe,
        debateType: "DEBATE",
        debateStatus: form.debateStatus,
        voteType: "FOR_AND_AGAINST"
      }
      requestMap.createDebate(param, accessToken).then((res) => {
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
