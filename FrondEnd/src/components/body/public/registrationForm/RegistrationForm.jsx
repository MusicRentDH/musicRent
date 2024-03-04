import React, { useState } from 'react';
import './RegistrationForm.css'; // Estilos CSS para el formulario de registro
import img_registration from '../../../../assets/Crear_Cuenta/crear cuenta.png'; // Importa la imagen de registro
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstNameError = 'El formato del campo de Nombre es incorrecto';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastNameError = 'El formato del campo de Apellido es incorrecto';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.emailError = 'El correo electrónico proporcionado no es válido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.emailError = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.passwordError = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.passwordError = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8081/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          console.log('Registro exitoso');
          // Aquí podrías redirigir al usuario a una página de éxito o realizar alguna otra acción
        } else {
          console.error('Error en el registro:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    }
  };

  return (
    <div className="registration-form-container">
        <div className='img'>
      <img src={img_registration} alt="Registro" className="img_resgistration" /> {/* Agrega la imagen al principio del formulario */}
      </div>
      <div className='form'>
      <h2 className='h2_crear_cuenta'>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p className="error-message">{formErrors.firstNameError}</p>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className="error-message">{formErrors.lastNameError}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="error-message">{formErrors.emailError}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="error-message">{formErrors.passwordError}</p>
        </div>        
        <button  type="submit">Crear Cuenta</button>       
        <div className='inf'>
        <Link to='/authenticate'>
        <p>¿Ya tienes una cuenta creada? <span>Iniciar Sesión</span></p>
        </Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
