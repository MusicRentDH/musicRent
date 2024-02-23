import React from "react"
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import { ApiProvider } from "./context/ApiContext"; 
import Footer from "./components/footer/Footer";
import AdminHome from "./components/body/admin/adminProducts/AdminHome";




function App() {
  

  return (
    <>     
      <BrowserRouter>
      <ApiProvider>
      <h1>Hola, soy header</h1>
        <Routes>
          <Route path="/" element={<PublicProducts/>} />
          <Route path="/admin" element= {<AdminHome/>} />
          <Route path="/admin/dashboard" element= {<AdminProducts/>} />
          <Route path="*" element={<p>Nor found</p>}/>
        </Routes>
      <Footer/> 
      </ApiProvider>
      </BrowserRouter>             
    </>
  )
}

export default App
