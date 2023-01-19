import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h2>You notes</h2>
        {notes.length >= 1
          ? notes.map((note) => {
              return <Noteitem note={note} key={note._id} />;
            })
          : "No notes available."}
      </div>
    </>
  );
};

export default Notes;
