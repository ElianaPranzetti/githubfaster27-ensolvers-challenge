//const pool = require("../db");
import { Note } from "../models/Notes.js";

export const getAllNotesArchived = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: {
        isArchived: true,
      },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const getAllNotesUnarchive = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: {
        isArchived: false,
      },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const { title, description, isArchived } = req.body;

  try {
    const newNote = await Note.create({
      title,
      description,
      isArchived,
    });

    res.json(newNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Note.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findByPk(id);
    note.title = title;
    note.description = description;

    await note.save();

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const switchIsArchived = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isArchived } = req.body;

    const note = await Note.findByPk(id);
    note.title = title;
    note.description = description;
    note.isArchived = isArchived;

    await note.save();

    res.json(note);
  } catch (error) {
    next(error);
  }
};
