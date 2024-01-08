import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../../store/actions";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import "./index.css";

const JoinRoomPage = (props) => {
  const search = useLocation().search;
  const { setIsRoomHostAction, isRoomHost } = props;
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      setIsRoomHostAction(isRoomHost);
    }
  }, []);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  );
};

//将 store 作为 props 绑定到组件上
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

//将 action 作为 props 绑定到组件上，
const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

//connect 方法，链接react组件与redux store，允许我们将 store 中的数据作为 props 绑定到组件上。
export default connect(mapStateToProps, mapActionsToProps)(JoinRoomPage);
