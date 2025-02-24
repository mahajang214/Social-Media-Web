import { useState}  from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import authStore from './Store/authStore';
import ErrorPage from './Pages/ErrorPage'

function App() {
  const {authenticate}=authStore();

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticate?<MainPage />:<ErrorPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="*" element={<ErrorPage/>} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
