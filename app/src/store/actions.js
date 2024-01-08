const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECTION_ONLY_WITH_AUDIO: "SET_CONNECTION_ONLY_WITH_AUDIO",
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

export default Actions;
