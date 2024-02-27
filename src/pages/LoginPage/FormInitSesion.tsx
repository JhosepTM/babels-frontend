import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import ModalError from "./ModalError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthToken, setAuthHeader } from "@/services/Login/tokenService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/entities/CustomJwtPayload";
import { useNavigate } from "react-router-dom";

interface FormState {
  username: string;
  password: string;
}

const FormInitSesion: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    username: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

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

    if (!formData.username.trim() || !formData.password.trim()) {
      setModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const mAdmin = () => {
    let token = getAuthToken();
    if (token !== null) {
      setIsAuthenticated(true);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded.role);
      if (decoded.role?.includes("ADMIN")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(JSON.stringify({ login: login, password: password }));
    event.preventDefault();
    try {
      fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ login: login, password: password }),
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          console.log(data, "----------------------");
          if (data !== null) {
            setAuthHeader(data["token"]);
            if (data["role"] === "ADMIN") {
              navigate("/madmin", { replace: true });
            } else {
              navigate("/muser", { replace: true });
            }
          } else {
            setAuthHeader(null);
          }
        })
        .finally(() => {
          setTimeout(() => {
            mAdmin();
          }, 2000);
        });
    } catch (e) {
      console.log(e);
    }

    console.log(isAdmin, "Adm");
  };

  return (
    <div className="items-center">
      <form onSubmit={onSubmit} className="form-container">
        <div className="form-group items-center">
          <Label htmlFor="username" style={{ fontSize: "150%" }}>
            Username:
          </Label>
          <Input
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            className="border-b border-gray-500 bg-transparent focus:outline-none w-80"
            onChange={(event) => setLogin(event.target.value)}
            name="username"
            value={login}
          />
        </div>
        <div className="form-group items-center">
          <Label htmlFor="password" style={{ fontSize: "150%" }}>
            Contraseña:
          </Label>
          <div className="password-input relative w-80">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              className="border-b border-gray-500 bg-transparent focus:outline-none w-full pr-10"
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              value={password}
            />
            <i
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={handleTogglePassword}
            ></i>
          </div>
        </div>
        <div className="But mt-4">
          <Button
            className="bg-zinc-800 w-full h-12 flex items-center justify-center"
            type="submit"
          >
            {" "}
            Ingresar
          </Button>
        </div>
      </form>
      <div
        className={`ModalError fixed inset-0 flex items-center justify-center ${
          modalOpen ? "visible" : "hidden"
        }`}
        onClick={handleCloseModal}
      >
        <div className="modal-content">{modalOpen && <ModalError />}</div>
      </div>
    </div>
  );
};

export default FormInitSesion;
