const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECTION_ONLY_WITH_AUDIO: "SET_CONNECTION_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
};

export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    isRoomHost,
  };
};

export const setConnectionOnlyWithAudio = (connectionOnlyWithAudio) => {
  return {
    type: Actions.SET_CONNECTION_ONLY_WITH_AUDIO,
    connectionOnlyWithAudio,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: Actions.SET_ROOM_ID,
    roomId,
  };
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setShowOverlay = (showOverlay) => {
  return {
    type: Actions.SET_SHOW_OVERLAY,
    showOverlay,
  };
};

export const setParticipants = (participants) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    participants,
  };
};

export default Actions;
