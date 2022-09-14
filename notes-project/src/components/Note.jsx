import React from "react";
import { MdEdit, MdArchive, MdDelete, MdUnarchive } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import toast from "react-hot-toast";

const Note = (props) => {
  return (
    <div>
      <div className="flex">
        <FaStickyNote className="h-8 w-8 mt-1.5 text-sky-600" />
        <div className="ml-3">
          <h1 className="font-bold text-xl text-left w-15 text-clip">
            {props.note.title}
          </h1>
          <p className="font-semibold text-xs">
            Last edited: {props.note.updatedAt.substr(0, 10)}
          </p>
        </div>
      </div>

      <div className="border-t border-sky-300"></div>
      <p className="my-2 text-lg text-ellipsis">{props.note.description}</p>
      <div className="flex justify-end gap-1">
        <button
          className="bg-sky-400 text-white py-1 px-2 rounded hover:bg-sky-500 transition"
          onClick={() =>
            props.listArchivedIsActive
              ? props.unArchiveNotes(props.note)
              : props.archiveNote(props.note)
          }
        >
          {props.listArchivedIsActive ? (
            <MdUnarchive className="h-5 w-5 text-black" />
          ) : (
            <MdArchive className="h-5 w-5 text-black" />
          )}
        </button>

        <button
          className="bg-sky-400 text-white py-1 px-2 rounded hover:bg-sky-500 transition"
          onClick={() => props.editNote(props.note)}
        >
          <MdEdit className="h-5 w-5 text-black" />
        </button>

        <button
          className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
          onClick={() =>
            toast((t) => (
              <span>
                <h2>Are you sure you want to delete this note?</h2>
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    onClick={() => props.handleDelete(props.note, t.id)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-sky-400 text-white py-1 px-2 rounded hover:bg-sky-500 transition"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    No
                  </button>
                </div>
              </span>
            ))
          }
        >
          <MdDelete className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Note;
