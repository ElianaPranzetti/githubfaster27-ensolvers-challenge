import React, { useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const NewNoteModal = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const handleClickClose = () => {
    props.setShowModalWindow(false);
    props.setMode("add");
    props.setNote({ title: "", description: "", isarchived: false });
  };

  const handleClickAdd = () => {
    if (category.name !== "" && categories.length < 3) {
      setCategories([...categories, category]);
      setCategory({ name: "" });
    } else {
      toast(`Somethin wrong with the category`);
    }
  };

  const handleClickDeleteCategory = (category) => {
    const index = categories.indexOf(category);
    const newCategoriesList = categories.filter((t, i) => i !== index);
    setCategories(newCategoriesList);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-x">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* this is the header for the modal window */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h1 className="text-2xl font-semibold text-pink-600">
                {props.mode === "add" ? "New Note" : "Edit Note"}
              </h1>
            </div>
            {/* this is the body */}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                value={props.note.title}
                placeholder="Title"
                //disabled={!user}
                className="border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1
                  w-full"
                onChange={(e) =>
                  props.setNote({ ...props.note, title: e.target.value })
                }
              />
              <textarea
                type="text"
                rows={3}
                value={props.note.description}
                placeholder="Description"
                //disabled={!user}
                className="border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1
                w-full mt-3"
                onChange={(e) =>
                  props.setNote({ ...props.note, description: e.target.value })
                }
              />
              <div className="rounded-lg border ring-sky-200 px-4  pt-2 flex flex-col gap-2 mt-5 shadow">
                <p className="font-semibold">Your categories</p>
                <div className="border-t border-sky-300"></div>
                <div className="grid grid-cols-3 gap-2 h-fit p-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex rounded-lg border ring-sky-200 bg-sky-300 justify-center items-center shadow-2xl"
                    >
                      <IoMdPricetag className="h-5 w-5 m-2" />
                      <h1 className="font-semibold truncate w-10">
                        {category.name}
                      </h1>
                      <MdDelete
                        className="h-5 w-5 text-red-700 cursor-pointer m-2"
                        onClick={() => handleClickDeleteCategory(category)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex-auto mt-3">
                <input
                  type="text"
                  className="border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 left-0"
                  placeholder="Category"
                  value={category.name}
                  onChange={(e) => setCategory({ name: e.target.value })}
                />
                <button
                  className="bg-sky-500 text-white hover:bg-sky-700 font-bold uppercase text-sm px-2 py-2 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => handleClickAdd()}
                >
                  Add
                </button>
              </div>
            </div>
            {/* this is the footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleClickClose()}
              >
                Close
              </button>

              <button
                className="bg-sky-500 text-white hover:bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={
                  props.mode === "add" ? props.addNewNote() : props.updateNote()
                }
              >
                {props.mode === "add" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NewNoteModal;
