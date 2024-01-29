import React from "react";

const dummyParticipants = [
  {
    identity: "Summer",
  },
  {
    identity: "Lucy",
  },
  {
    identity: "Henry",
  },
  {
    identity: "Tom",
  },
];

const SingleParticipant = ({ identity, lastItem, participant }) => (
  <>
    <p className="participants_paragraph">{identity}</p>
    {!lastItem && <span className="participants_separator_line" />}
  </>
);

const Participants = () => {
  return (
    <div className="participants_container">
      {dummyParticipants.map((participant, index) => (
        <SingleParticipant
          identity={participant.identity}
          lastItem={dummyParticipants.length === index + 1}
          participant={participant}
          key={participant.identity}
        />
      ))}
    </div>
  );
};

export default Participants;
