const express = require("express");
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  updateNoteTag,
  getAllNotesUserId,
  deleteNote,
} = require("../controller/note.controller");

const router = express.Router();

router.get("/notes", getAllNotes);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.post("/notes/user", getAllNotesUserId);
router.put("/notes/:id", updateNote);
router.put("/notes/tag/:id", updateNoteTag);
router.delete("/notes/:id", deleteNote);

module.exports = router;
