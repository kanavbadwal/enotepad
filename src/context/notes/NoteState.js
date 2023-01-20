import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //const host = "http://localhost:4000";
  const host_env = process.env.REACT_APP_HOST;

  const [notes, setNotes] = useState([]);

  // Get all notes.
  const getNotes = async () => {
    // Api Call
    const response = await fetch(`${host_env}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNjNjRhNzE0NGE4NmQzNWU1MzgwMTUxIiwiaWF0IjoxNjczOTQ1ODE4fQ.I8vOQv4o9LXElD3K-m3Q4m9ldSm4ySZkw3hQJ0a9OYU",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add new note.
  const addNote = async (title, description, tag) => {
    // Api Call

    const response = await fetch(`${host_env}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNjNjRhNzE0NGE4NmQzNWU1MzgwMTUxIiwiaWF0IjoxNjczOTQ1ODE4fQ.I8vOQv4o9LXElD3K-m3Q4m9ldSm4ySZkw3hQJ0a9OYU",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json.Note));
  };

  // Delete an existing note.
  const deleteNote = async (id) => {
    // Api Call
    const response = await fetch(`${host_env}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNjNjRhNzE0NGE4NmQzNWU1MzgwMTUxIiwiaWF0IjoxNjczOTQ1ODE4fQ.I8vOQv4o9LXElD3K-m3Q4m9ldSm4ySZkw3hQJ0a9OYU",
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // Api Call
    const response = await fetch(`${host_env}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNjNjRhNzE0NGE4NmQzNWU1MzgwMTUxIiwiaWF0IjoxNjczOTQ1ODE4fQ.I8vOQv4o9LXElD3K-m3Q4m9ldSm4ySZkw3hQJ0a9OYU",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
