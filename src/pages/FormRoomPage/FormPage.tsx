import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const FormPage = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");

    if (event.target.value.length > 100) {
      event.target.value = event.target.value.substring(0, 100);
    }
  };

  const handleDescriptionChange = (event: { target: { value: string } }) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");

    if (event.target.value.length > 200) {
      event.target.value = event.target.value.substring(0, 200);
    }
  };

  const handlePriceChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const onlyNumbersAndCurrency = value.replace(/[^0-9$Bs]/g, "");
    event.target.value = onlyNumbersAndCurrency;
  };

  const handleRegister = () => {
    if (name.trim() === "") {
      setNameError(
        "¡El campo del nombre de la habitación no puede estar vacío!"
      );
    } else {
      setNameError("");
      // Aquí puedes agregar la lógica para enviar el formulario
    }
  };

  return (
    <div className="ml-4">
      <Header />
      <div>
        <div className="w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="font-bold text-xl">
            Nombre de la habitación
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Ingrese el nombre de la habitación"
            className="border-2 border-black"
            onChange={handleChange}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>

        <div className="w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="description" className="font-bold text-xl">
            Descripcion
          </Label>
          <Textarea
            placeholder="Ingresa la descripcion de la habitacion"
            className="border-2 border-black"
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl ">Imagenes</Label>
          <Input
            id="pictures"
            className="border-2 border-black"
            type="file"
            accept="image/*"
            multiple
          />
          <Label className="text-sm text-gray-500">
            Selecciona hasta 10 imágenes
          </Label>
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl">Tipo</Label>
          <Select>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="hover:bg-black hover:text-white">
                <SelectLabel>Tipo de habitacion</SelectLabel>
                <SelectItem value="Basico">Basico</SelectItem>
                <SelectItem value="Medio">Medio</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="items-center gap-1.5">
          <Label className="font-bold text-xl" htmlFor="price">
            Precio
          </Label>
          <Input
            type="text"
            id="price"
            placeholder="Ingrese el precio por día de la habitación"
            className="border-2 border-black w-72"
            onChange={handlePriceChange} // Manejar el cambio de valor
          />
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl">Cantidad</Label>
          <Select>
            <SelectTrigger className="w-[280px] border-2 border-black">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="hover:bg-black hover:text-white">
                <SelectLabel>
                  Capacidad de personas en la habitacion
                </SelectLabel>
                <SelectItem value="one">1 persona</SelectItem>
                <SelectItem value="two">2 personas</SelectItem>
                <SelectItem value="three">3 personas</SelectItem>
                <SelectItem value="four">4 personas</SelectItem>
                <SelectItem value="five">5 personas</SelectItem>
                <SelectItem value="six">6 personas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Button
            className="bg-zinc-950 hover:bg-zinc-700"
            onClick={handleRegister}
          >
            Registrar
          </Button>
        </div>
      </div>
    </div>
  );
};
