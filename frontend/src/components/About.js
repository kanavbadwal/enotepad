import React from "react";

const About = () => {
  return (
    <div className="container col-md-9 mt-5  shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="my-3" style={{ textAlign: "center" }}>
        eNotepad
      </h2>
      <div className="mt-5 mb-3">
        Users can take and save notes using the simple and user-friendly web
        notepad provided by eNotepad.
        {"\n"}It gives a user expreience to take private notes which will not be
        revealed to others. You can take note for anywhere anytime.
        {"\n"}
        {"\t"} Thanks for using <b>eNotepad</b>.
      </div>
    </div>
  );
};

export default About;
