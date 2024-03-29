import Actions from "./actions";

const initState = {
  identity: "",
  isRoomHost: false,
  connectionOnlyWithAudio: false,
  roomId: null,
  showOverlay: true,
  participants: [],
};

const reducer = (state = initState, action) => {
  const {
    isRoomHost,
    connectionOnlyWithAudio,
    roomId,
    identity,
    showOverlay,
    participants,
  } = action;
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
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity,
      };
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants,
      };
    default:
      return state;
  }
};

export default reducer;
