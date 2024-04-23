const noteService = require("../services/note.service");

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllNotesUserId = async (req, res) => {
  try {
    const { id } = req.body;
    const notes = await noteService.getAllNotesUserId(id);
    res.json(notes);
  } catch (error) {
    console.log("Note Not Found");
  }
};

// Get note by ID
const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteService.getNoteById(id);
    res.json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content, users } = req.body;

  try {
    const newNote = await noteService.createNote({ title, content, users });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update note by ID
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content ,remind} = req.body;
  console.log(id, title, content,remind);
  try {
    const updatedNote = await noteService.updateNote(id, title, content,remind);
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update note tag by ID
const updateNoteTag = async (req, res) => {
  const { id } = req.params;
  const { tag} = req.body;
  console.log("controller" + id + tag);
  try {
    const updatedNote = await noteService.updateNoteTag(id, tag);
    res.json(updatedNote);
  } catch (error) {
    console.log("not Found");
  }
};

// Delete note by ID
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await noteService.deleteNote(id);
    res.json(deletedNote);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  updateNoteTag,
  getAllNotesUserId,
  deleteNote,
};
