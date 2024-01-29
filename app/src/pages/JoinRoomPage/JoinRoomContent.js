import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConnectionOnlyWithAudio, setRoomId, setIdentity } from "../../store/actions";
import JoinRoomInputs from "./JoinRoomInputs";
import JoinRoomButtons from "./JoinRoomButtons";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import ErrorMessage from "./ErrorMessage";
import { getRoomExists } from '../../utils/api';

const JoinRoomContent = ({
  isRoomHost,
  connectionOnlyWithAudio,
  setConnectionOnlyWithAudio,
  setRoomIdAction,
  setIdentityAction
}) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    setIdentityAction(nameValue);
    if (isRoomHost) {
      if (nameValue == '') {
        setErrorMessage('请输入主持人姓名!')
        return;
      }
      createRoom();
    } else {
      if (roomIdValue == '') {
        setErrorMessage('请输入房间ID号!')
        return;
      }
      if (nameValue == '') {
        setErrorMessage('请输入主持人姓名!')
        return;
      }
      joinRoom();
    }
  }

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);
    const { rooExisits, full } = responseMessage;
    if (rooExisits) {
      if(full) {
        setErrorMessage('会议房间人数已满，请稍后在重试!')
      } else {
        setRoomIdAction(roomIdValue);
        navigate('/room');
      }
    } else {
      setErrorMessage('会议房间不存在，请验证你的ID是否正确!');
    }
  }

  const createRoom = async () => {
    navigate('/room');
  }

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
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons isRoomHost={isRoomHost} handleJoinRoom={handleJoinRoom} />
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
    setConnectionOnlyWithAudio: (connectionOnlyWithAudio) => dispatch(setConnectionOnlyWithAudio(connectionOnlyWithAudio)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent);
