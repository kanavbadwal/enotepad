import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { showAlert } = props;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="position-absolute top-0 end-0 my-1 mx-1">
            <i
              className="fa-regular fa-pen-to-square mx-1"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>

          <h5 className="card-title" style={{ marginTop: "0.5rem" }}>
            {note.title}
          </h5>

          <p className="card-text">{note.description} </p>
          <small>{note.tag}</small>
          <div className="position-absolute bottom-0 end-0 my-1 mx-1">
            <i
              className="fa-regular fa-trash-can mx-1"
              onClick={() => {
                deleteNote(note._id);
                showAlert(
                  '"' + note.title + '" note is successfully deleted.',
                  "success"
                );
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
