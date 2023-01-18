const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes of the user : GET "/api/auth/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 2: Add a new note in the user account : POST "/api/auth/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title of a minimum 5 characters.").isLength({
      min: 3,
    }),
    body(
      "description",
      "Enter a description of a minimum 5 characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If an error, it'll return a bad request and an error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Variable will take and store data in 'note'.
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // Data is sent to the db.
      const saveNote = await note.save();
      res.json({ Success: "The new note is saved.", Note: saveNote });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// ROUTE 3: Edit an existing note : PUT "/api/auth/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote object.
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note and update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

// ROUTE 4: Delete an existing note : DELETE "/api/auth/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note if it is there.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ Unsuccessfull: "Note not found." });
    }

    // Check if the logged-in user is the authorized user and note belongs to the user who logged in.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Find and delete the note.
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "The note has been deleted.", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Internal server error." });
  }
});

module.exports = router;
