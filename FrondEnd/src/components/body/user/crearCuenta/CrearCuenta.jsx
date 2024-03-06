import React, { useState } from 'react';
import { useApi } from '../../../../context/ApiContext'; 
import './CrearCuenta.css';
import Modal from 'react-modal'; 
import img_registration from '../../../../assets/CrearCuenta/crear cuenta.png';
import imgModal from '../../../../assets/Admin/Admin_Productos/icon-creation-product.png';

const CrearCuenta = () => {
  const { createAccount } = useApi();

  const [formErrors, setFormErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: ''
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [roleChanged, setRoleChanged] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      errors.emailError = 'La dirección de correo electrónico no es válida';
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
        await createAccount({
          email: formData.email,
          password: formData.password,
          name: formData.firstName,
          lastName: formData.lastName
        });

        setRoleChanged(true);
        setShowModal(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRoleChanged(false);
  };

  return (
    <div className="registration-form-container">
      <div className='img'>
        <img src={img_registration} alt="Registro" className="img_resgistration" />
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
              onChange={handleChange}
              value={formData.firstName}
            />
            <p className="error-message">{formErrors.firstNameError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
            <p className="error-message">{formErrors.lastNameError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <p className="error-message">{formErrors.emailError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            <p className="error-message">{formErrors.passwordError}</p>
          </div>

          <button type="submit">Crear Cuenta</button>
          <div className='inf'>
            <p>¿Ya tienes una cuenta creada? <span>Iniciar Sesión</span></p>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showModal && roleChanged}
        onRequestClose={closeModal}
        contentLabel="Felicitaciones Modal"
        className="Modal"
      >
        <div className='modal-user-edition'>
          <img className='img-modal-edition' src={imgModal} alt="" />
          <h4 className='text-modal-user'>Felicitaciones</h4>
          <p className='text-modal-user-p'>¡Bienvenido a nuestra comunidad musical! 🎶 Por favor, toma un momento para revisar tu correo y confirmar tu registro!</p>          
          <button className='boton-modal-user' onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default CrearCuenta;


