import React, { useState } from "react";
import { connect } from "react-redux";
import { setConnectionOnlyWithAudio } from "../../store/actions";
import JoinRoomInputs from "./JoinRoomInputs";
import JoinRoomButtons from "./JoinRoomButtons";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import ErrorMessage from "./ErrorMessage";

const JoinRoomContent = ({
  isRoomHost,
  connectionOnlyWithAudio,
  setConnectionOnlyWithAudio,
}) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
        connectionOnlyWithAudio={connectionOnlyWithAudio}
        setConnectionOnlyWithAudio={setConnectionOnlyWithAudio}
      />
      <ErrorMessage errorMessage={`会议ID不正确！`} />
      {/* <JoinRoomButtons buttonText={`取消`} onClickHandleer={() => return false} /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setConnectionOnlyWithAudio: (connectionOnlyWithAudio) =>
      dispatch(setConnectionOnlyWithAudio(connectionOnlyWithAudio)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent);
