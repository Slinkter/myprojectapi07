import React from "react";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AddNewBlog from "./pages/add-blog";

const App = () => {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlog />} />
      </Routes>
    </div>
  );
};

export default App;
