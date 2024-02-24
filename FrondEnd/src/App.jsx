import React from "react"
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import { ApiProvider } from "./context/ApiContext";
import Header from './components/header/Header' 
import Footer from "./components/footer/Footer";




function App() {
  

  return (
    <>     
      <BrowserRouter>
      <ApiProvider>
      <Header />
        <Routes>
          <Route path="/" element={<PublicProducts/>} />
          <Route path="/admin" element= {<AdminProducts/>} />
          <Route path="*" element={<p>Nor found</p>}/>
        </Routes>
      <Footer /> 
      </ApiProvider>
      </BrowserRouter>             
    </>
  )
}

export default App
