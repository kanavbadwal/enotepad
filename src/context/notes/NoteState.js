import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63c6880588b2384d4caed16e",
      user: "63c64a7144a86d35e5380151",
      title: "Note",
      description: "My new note.",
      tag: "personal",
      date: "2023-01-17T11:35:33.036Z",
      __v: 0,
    },
    {
      _id: "63c6880588b2384d4caed170",
      user: "63c64a7144a86d35e5380151",
      title: "Note",
      description: "My new note.",
      tag: "personal",
      date: "2023-01-17T11:35:33.252Z",
      __v: 0,
    },
    {
      _id: "63c6880688b2384d4caed172",
      user: "63c64a7144a86d35e5380151",
      title: "Note",
      description: "My new note.",
      tag: "personal",
      date: "2023-01-17T11:35:34.275Z",
      __v: 0,
    },
    {
      _id: "63c6880888b2384d4caed174",
      user: "63c64a7144a86d35e5380151",
      title: "Note",
      description: "My new note.",
      tag: "personal",
      date: "2023-01-17T11:35:36.339Z",
      __v: 0,
    },
    {
      _id: "63c78ba5de2511e1a54d3cc3",
      user: "63c64a7144a86d35e5380151",
      title: "Note-1",
      description: "My new note.-1",
      tag: "personal",
      date: "2023-01-18T06:03:17.276Z",
      __v: 0,
    },
    {
      _id: "63c78bacde2511e1a54d3cc5",
      user: "63c64a7144a86d35e5380151",
      title: "Note-2",
      description: "My new note.-2",
      tag: "personal",
      date: "2023-01-18T06:03:24.919Z",
      __v: 0,
    },
    {
      _id: "63c78bb3de2511e1a54d3cc7",
      user: "63c64a7144a86d35e5380151",
      title: "Note-3",
      description: "My new note.-3",
      tag: "personal",
      date: "2023-01-18T06:03:31.131Z",
      __v: 0,
    },
    {
      _id: "63c78c2c3759f4a2a2d7650a",
      user: "63c64a7144a86d35e5380151",
      title: "Note-5",
      description: "My new note.-5",
      tag: "personal",
      date: "2023-01-18T06:05:32.513Z",
      __v: 0,
    },
    {
      _id: "63c78c9b0505058b94d82468",
      user: "63c64a7144a86d35e5380151",
      title: "Note-5",
      description: "My new note.-5",
      tag: "personal",
      date: "2023-01-18T06:07:23.516Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // Add new note.
  const addNote = (title, description, tag) => {
    // TODO: Api call
    const note = {
      _id:
        "63c78c9b0505058224d82468" + Math.random().toString(36).substring(2, 7),
      user: "63c64a7144a86d35e5380151",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-18T06:07:23.516Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    console.log("A new note is added.");
  };

  // Delete an existing note.
  const deleteNote = (id) => {
    console.log("The note with id " + id + " is deleted.");
    const newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };

  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
