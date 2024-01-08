import React from "react";
import CheckImg from "../../resources/images/check.png";

// const OnlyWithAudioCheckbox = ({
//   // connectionOnlyWithAudio,
//   // setConnectionOnlyWithAudio,
// }) => {
//   const handleConnectionTypeChange = () => {
//     const handleConnectionTypeChange = () => {
//     // setConnectionOnlyWithAudio(!connectionOnlyWithAudio);
//   };

//   return (
//     <div className="checkbox_container">
//       <div className="checkbox_connection">
//         {/* {connectionOnlyWithAudio && (
//           <img src={CheckImg} className="checkbox_img" />
//         )} */}
//       </div>
//       <p className="checkbox_container_paragraph">只开启音频</p>
//     </div>
//   );
// };
const OnlyWithAudioCheckbox = ({
  connectionOnlyWithAudio,
  setConnectionOnlyWithAudio,
}) => {
  const handleConnectionTypeChange = () => {
    setConnectionOnlyWithAudio(!connectionOnlyWithAudio);
  };

  return (
    <div className="checkbox_container" onClick={handleConnectionTypeChange}>
      <div className="checkbox_connection">
        {connectionOnlyWithAudio && (
          <img src={CheckImg} className="checkbox_img" />
        )}
      </div>
      <p className="checkbox_container_paragraph">只开启音频</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
