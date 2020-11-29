import React from "react";
import DebateList, {DebateListProps} from "./DebateList";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {RootState} from "../../store";
import {DebateSlice} from "../../store/debate/DebateReducer";

const DebateListContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const debateState: any = useSelector<RootState>(state => {
    return {...state.debateReducer}
  });
  const DebateListParam: DebateListProps = {
    debateList: debateState.recentDebateList,
    goToDebateHandler: (threadNo) => {
        dispatch(DebateSlice.actions.setSelectedThreadNo(threadNo));
        history.push(`/debate/${threadNo}`);
    }
  };

  return (
    <DebateList {...DebateListParam} />
  )
}

export default DebateListContainer;
