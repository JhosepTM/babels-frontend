import React, { ChangeEvent, FormEvent, useState } from 'react';
import "@/css/LoginPage/FormularioSesion.css"
import ModalError from "./ModalError"

interface FormState {
  correoElectronico: string;
  contraseña: string;
}

const Formulario: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    correoElectronico: '',
    contraseña: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'correoElectronico') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(event.target.value));
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.correoElectronico.trim() && !formData.contraseña.trim()) {
      setModalOpen(true);
      return;
    }

    if (emailValid) {
      console.log('Formulario enviado:', formData);
    } else {
      console.log('Correo electrónico no válido. Por favor, corrige el formato.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            type="text"
            id="correoElectronico"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            placeholder=" Ingrese su correo electrónico"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder=" Ingrese su contraseña"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={handleTogglePassword}
            ></i>
          </div>
        </div>
        <div className='But'>
          <button className='button' type="submit">
            Ingresar
          </button>
        </div>
      </form>
      <div className={`ModalError fixed inset-0 flex items-center justify-center ${modalOpen ? 'visible' : 'hidden'}`} onClick={handleCloseModal}>
        <div className="modal-content">
          {modalOpen && <ModalError />}
        </div>
      </div>
    </div>
  );
};

export default Formulario;