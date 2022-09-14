import React, { useState, useEffect } from "react";
import NewNoteModal from "../NewNoteModal";
import toast from "react-hot-toast";
import Note from "../Note";

const NotesList = () => {
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
    isArchived: false,
  });
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [mode, setMode] = useState("add");
  const [index, setIndex] = useState(0);
  const [listArchivedIsActive, setListArchived] = useState(false);
  const [isCreateNoteActive, setIsCreateNoteActive] = useState(true);

  const loadNotesUnarchived = async () => {
    const response = await fetch("http://localhost:4000/notes/unarchive");
    const data = await response.json();
    setNotes(data);
  };

  const loadNotesArchived = async () => {
    const response = await fetch("http://localhost:4000/notes/archived");
    const data = await response.json();
    setArchivedNotes(data);
  };

  useEffect(() => {
    loadNotesUnarchived();
    // loadNotesArchived();
  }, []);

  const createNewNote = async () => {
    try {
      if (note.title === "") return toast(`the note must have a title`);

      await fetch("http://localhost:4000/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      loadNotesUnarchived();
      setShowModalWindow(false);
      setNote({
        title: "",
        description: "",
        isarchived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = (note) => {
    setMode("update");
    setNote(note);
    setIndex(notes.indexOf(note));
    setShowModalWindow(true);
  };

  const handleClickEditNote = async () => {
    await fetch(`http://localhost:4000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    setMode("add");
    setShowModalWindow(false);
    setNote({
      title: "",
      description: "",
      isarchived: false,
    });
    if (listArchivedIsActive === true) {
      loadNotesArchived();
    } else {
      loadNotesUnarchived();
    }
  };

  const archiveNote = async (note) => {
    await fetch(`http://localhost:4000/notes/switch/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isArchived: true }),
    });

    loadNotesUnarchived();
  };

  const unArchiveNotes = async (note) => {
    await fetch(`http://localhost:4000/notes/switch/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isArchived: false }),
    });
    loadNotesArchived();
  };

  const handleDelete = async (note, toastId) => {
    await fetch(`http://localhost:4000/notes/${note.id}`, {
      method: "DELETE",
    });

    toast.dismiss(toastId);

    if (listArchivedIsActive === true) {
      loadNotesArchived();
    } else {
      loadNotesUnarchived();
    }
  };

  const handleClickArchive = () => {
    setListArchived(true);
    setIsCreateNoteActive(false);
    loadNotesArchived();
  };

  const handleGoToNotes = () => {
    setListArchived(false);
    setIsCreateNoteActive(true);
    loadNotesUnarchived();
  };

  return (
    <div>
      {showModalWindow ? (
        <NewNoteModal
          setShowModalWindow={setShowModalWindow}
          setNote={setNote}
          note={note}
          addNewNote={() => createNewNote}
          updateNote={() => handleClickEditNote}
          mode={mode}
          setMode={setMode}
        />
      ) : null}

      <div className="flex gap-2 py-3 justify-center mt-20">
        <button
          className="bg-sky-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-sky-700 transition mt-5"
          onClick={() =>
            listArchivedIsActive ? handleGoToNotes() : setShowModalWindow(true)
          }
        >
          {listArchivedIsActive ? "Go To Notes" : "Create New Note"}
        </button>

        <button
          className="bg-sky-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-sky-700 transition mt-5"
          onClick={() => handleClickArchive()}
        >
          Archived Notes
        </button>
      </div>

      <div>
        {isCreateNoteActive && notes.length === 0 ? (
          <p className="font font-semibold items-center text-xl">
            There are no notes to show
          </p>
        ) : null}
        {listArchivedIsActive && archivedNotes.length === 0 ? (
          <p className="font font-semibold text-xl">
            There are no notes in the archived list
          </p>
        ) : null}

        <div className="grid grid-cols-3 gap-4  px-5">
          {(isCreateNoteActive ? notes : archivedNotes).map((note, index) => (
            <div
              key={index}
              className="rounded-lg border border-sky-300 px-4 pb-4 pt-2 flex flex-col gap-2"
            >
              <Note
                note={note}
                listArchivedIsActive={listArchivedIsActive}
                unArchiveNotes={unArchiveNotes}
                archiveNote={archiveNote}
                editNote={editNote}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesList;
