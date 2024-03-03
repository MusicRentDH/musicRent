import React from 'react';
import { useApi } from '../../../../../context/ApiContext';

const LogoutPage = () => {
  const {logoutPage} = useApi();
  
  const logout = (e) => {
    e.preventDefault();
    logoutPage.logout();
  }

  return (
    <>
      <h1>Logout</h1>
      <form>
        <label>¿Seguro que quieres salir?</label>
        <button type="button" onClick={logout}>Salir</button>
      </form>
    </>
  );
}

export default LogoutPage;
