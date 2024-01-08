import React from "react";

const Input = ({ placehilder, value, changeHandler }) => (
  <input
    placeholder={placehilder}
    value={value}
    onChange={changeHandler}
    className="join_room_input"
  />
);

const JoinRoomInputs = ({
  roomIdValue,
  setRoomIdValue,
  nameValue,
  setNameValue,
  isRoomHost,
}) => {
  const handleRoomIdValueChange = (e) => setRoomIdValue(e.target.value);
  const handleNameValueChange = (e) => setNameValue(e.target.value);

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          placehilder={`请输入会议ID号...`}
          value={roomIdValue}
          changeHandler={handleRoomIdValueChange}
        />
      )}
      <Input
        placehilder={`请输入姓名...`}
        value={nameValue}
        changeHandler={handleNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInputs;
