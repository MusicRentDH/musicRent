import React from "react"
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import PublicProducts from "./components/body/public/publicProducts/PublicProducts";
import AdminProducts from "./components/body/admin/adminProducts/AdminProducts";
import { ApiProvider } from "./context/ApiContext"; 




function App() {
  

  return (
    <>     
      <BrowserRouter>
      <ApiProvider>
      <h1>Hola, soy header</h1>
        <Routes>
          <Route path="/" element={<PublicProducts/>} />
          <Route path="/admin" element= {<AdminProducts/>} />
          <Route path="*" element={<p>Nor found</p>}/>
        </Routes>
      <h1>Hola, soy footer</h1> 
      </ApiProvider>
      </BrowserRouter>             
    </>
  )
}

export default App
