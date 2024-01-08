import Actions from "./actions";

const initState = {
  identity: "",
  isRoomHost: false,
  connectionOnlyWithAudio: false,
};

const reducer = (state = initState, action) => {
  const { isRoomHost, connectionOnlyWithAudio } = action;
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost,
      };
    case Actions.SET_CONNECTION_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectionOnlyWithAudio,
      };
    default:
      return state;
  }
};

export default reducer;
