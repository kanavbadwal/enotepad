import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    // if (note.tag.length === 0) {
    //   setNote((previousState) => {
    //     return { ...previousState, stag: "Personal" };
    //   });

    //   console.log(note);
    // }
    // console.log(note.tag.length === 0);
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="It must be of minimum of 5 chararacters."
            minLength="5"
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            value={note.description}
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength="5"
            placeholder="It must be of minimum of 5 chararacters."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            placeholder={"Tag"}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-warning"
          onClick={handleClick}
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
