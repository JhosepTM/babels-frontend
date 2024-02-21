import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import ModalError from "./ModalError";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormState {
  username: string;
  contraseña: string;
}

const Formulario: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    username: '',
    contraseña: '',
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formData.username.trim() || !formData.contraseña.trim()) {
      setModalOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);

    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="items-center">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group items-center">
          <Label htmlFor="username" style={{ fontSize: '150%' }}>Username:</Label>
          <Input 
            type='username' 
            placeholder="Ingresa tu nombre de usuario" 
            className="border-b border-gray-500 bg-transparent focus:outline-none w-80"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>
        <div className="form-group items-center">
          <Label htmlFor="contraseña" style={{ fontSize: '150%' }}>Contraseña:</Label>
          <div className="password-input relative w-80">
            <Input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Ingresa tu contraseña" 
              className="border-b border-gray-500 bg-transparent focus:outline-none w-full pr-10"
              onChange={handleChange}
              name="contraseña"
              value={formData.contraseña}
            />
            <i
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={handleTogglePassword}
            ></i>
          </div>
        </div>
        <div className='But mt-4'>
          <Button className='bg-zinc-800 w-full h-12 flex items-center justify-center'> Ingresar</Button>
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

