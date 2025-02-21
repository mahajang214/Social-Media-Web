import { useState}  from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from './Pages/Register';


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
