import React, { ChangeEvent, FormEvent, useState } from 'react';
import "@/css/FormularioSesion.css"

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
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
  );
};

export default Formulario;