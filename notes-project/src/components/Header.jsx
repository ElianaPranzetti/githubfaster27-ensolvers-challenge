import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8">
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <FaTasks className='text-2xl text-pink-600' /> */}
        <span className="text-2xl font-semibold text-pink-600">MyNotes</span>
      </div>

      <div className="flex gap-2">
        <button className="bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition">
          Login
        </button>
        <button className="bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition">
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;
