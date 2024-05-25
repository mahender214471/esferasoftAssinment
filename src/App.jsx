import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import ViewsAddress from "./pages/ViewAddress";
export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/view-address" element={<ViewsAddress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
