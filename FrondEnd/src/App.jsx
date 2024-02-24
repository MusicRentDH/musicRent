import React from 'react'
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import { ApiProvider } from "./context/ApiContext";
import GalleryOfProducts from "./components/galleryOfProducts/GalleryOfProducts";
import PublicDetalles from "./components/publicProducts/publicDetalles/PublicDetalles";




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
          <Route path="/product/:id" element={<PublicDetalles />} />
        </Routes>
      </ApiProvider>
      </BrowserRouter>             
    </>
  )
}

export default App
