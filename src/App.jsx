import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./Pages/LoginUser";
import RegisterUser from "./Pages/RegisterUser";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="homepage">
      <Routes>
        {/* <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
