import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthHeader } from "@/services/Login/tokenService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/entities/customJwtPayload";
import { useNavigate } from "react-router-dom";

const FormInitSesion: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!login.trim()) {
      setUsernameError("Usuario vacío");
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Contraseña vacía");
    } else {
      setPasswordError("");
    }

    if (!login.trim() || !password.trim()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ login: login, password: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setAuthHeader(data.token);
        const decoded = jwtDecode<CustomJwtPayload>(data.token);
        if (decoded.role === "ADMIN") {
          navigate("/madmin", { replace: true });
        } else {
          navigate("/muser", { replace: true });
        }
      } else {
        setAuthHeader(null);
        setUsernameError("Credenciales incorrectas");
        setPasswordError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      setUsernameError("Error al iniciar sesión");
      setPasswordError("Error al iniciar sesión");
    }
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
          {usernameError && (
            <Label className="text-red-600 font-bold">{usernameError}</Label>
          )}
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
          {passwordError && (
            <Label className="text-red-600 font-bold">{passwordError}</Label>
          )}
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
    </div>
  );
};

export default FormInitSesion;
