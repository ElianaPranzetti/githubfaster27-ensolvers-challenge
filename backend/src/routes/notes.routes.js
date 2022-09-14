const { Router } = require("express");
const {
  getAllNotesArchived,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getAllNotesUnarchive,
  switchIsArchived
} = require("../controllers/notes.controller");

const router = Router();

router.get("/notes/archived", getAllNotesArchived);

router.get("/notes/unarchive", getAllNotesUnarchive);

router.get("/notes/:id", getNote);

router.post("/notes", createNote);

router.delete("/notes/:id", deleteNote);

router.put("/notes/:id", updateNote);

router.put("/notes/switch/:id", switchIsArchived);

module.exports = router;
