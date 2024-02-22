import React from 'react'
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import { ApiProvider } from "./context/ApiContext";
import GalleryOfProducts from "./components/galleryOfProducts/GalleryOfProducts";




function App() {
  

  return (
    <>     
      <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<PublicProducts/>} />
          <Route path="/admin" element= {<AdminProducts/>} />
          <Route path="*" element={<p>Nor found</p>}/>
          <Route path="/gallery" element= {<GalleryOfProducts/>} />
        </Routes>
      </ApiProvider>
      </BrowserRouter>             
    </>
  )
}

export default App
