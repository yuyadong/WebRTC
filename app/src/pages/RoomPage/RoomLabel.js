import React from "react";

const RoomLabel = ({ roomId }) => {
  return (
    <div className="room_label">
      <div className="room_label_paragraph">会议房间号:{roomId}</div>
    </div>
  );
};

export default RoomLabel;
