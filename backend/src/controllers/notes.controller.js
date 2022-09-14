const { restart } = require("nodemon");
const pool = require("../db");

const getAllNotesArchived = async (req, res, next) => {
  try {
    const allNotes = await pool.query(
      "SELECT * FROM note WHERE isarchived = $1",
      [true]
    );
    res.json(allNotes.rows);
  } catch (error) {
    next(error);
  }
};

const getAllNotesUnarchive = async (req, res, next) => {
  try {
    const allNotes = await pool.query(
      "SELECT * FROM note WHERE isarchived = $1",
      [false]
    );
    res.json(allNotes.rows);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM note WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  const { title, description, isarchived = false } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO note (title, description, isarchived) VALUES ($1,$2,$3) RETURNING *",
      [title, description, isarchived]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM note WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isarchived } = req.body;

    const result = await pool.query(
      "UPDATE note SET title = $1, description=$2, isarchived=$3 WHERE id = $4 RETURNING *",
      [title, description, isarchived, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const switchIsArchived = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isarchived } = req.body;

    const result = await pool.query(
      "UPDATE note SET isarchived=$1 WHERE id = $2 RETURNING *",
      [isarchived, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getAllNotesUnarchive,
  getAllNotesArchived,
  switchIsArchived,
};
