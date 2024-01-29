import React from "react";
import { connect } from "react-redux";

const SingleParticipant = ({ identity, lastItem }) => (
  <>
    <p className="participants_paragraph">{identity}</p>
    {!lastItem && <span className="participants_separator_line" />}
  </>
);

const Participants = ({ participants }) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <SingleParticipant
          identity={participant.identity}
          lastItem={participants.length === index + 1}
          participant={participant}
          key={participant.identity}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Participants);
