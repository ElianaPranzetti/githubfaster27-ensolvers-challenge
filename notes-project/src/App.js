import "./App.css";
import React from "react";
import Header from "./components/Header";
import NotesList from "./components/containers/NotesList";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <NotesList />
    </div>
  );
}

export default App;
