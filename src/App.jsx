import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./Pages/LoginUser";
import RegisterUser from "./Pages/RegisterUser";
import Chat from "./Pages/Chat";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
