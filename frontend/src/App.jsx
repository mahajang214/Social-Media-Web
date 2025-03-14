import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import authStore from "./Store/authStore";
import ErrorPage from "./Pages/ErrorPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchPage from "./Pages/SearchPage";
import Allposts from "./Pages/Allposts";

function App() {
  const { authenticate } = authStore();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authenticate ? <MainPage /> : <ErrorPage />}
          />
          <Route
            path="/profile"
            element={authenticate ? <ProfilePage /> : <ErrorPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/:id" element={<ImagePage />} /> */}
          <Route path="/search" element={authenticate ? <SearchPage/>: <ErrorPage />}/>
          <Route path="/posts" element={authenticate ? <Allposts/>: <ErrorPage />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
