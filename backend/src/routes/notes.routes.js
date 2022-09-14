import { Router } from "express";
import {
  getAllNotesArchived,
  getAllNotesUnarchive,
  createNote,
  deleteNote,
  updateNote,
  switchIsArchived,
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/notes/archived", getAllNotesArchived);
router.get("/notes/unarchive", getAllNotesUnarchive);
router.post("/notes", createNote);
router.delete("/notes/:id", deleteNote);
router.put("/notes/:id", updateNote);
router.put("/notes/switch/:id", switchIsArchived);

export default router;
