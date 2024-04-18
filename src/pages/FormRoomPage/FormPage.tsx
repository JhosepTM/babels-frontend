import { ChangeEvent, SetStateAction, useState } from "react";
import { Header } from "@/components/Header";
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
import { Description } from "@radix-ui/react-dialog";
import { getAuthToken } from "@/services/Login/tokenService";

export const FormPage = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesError, setImagesError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");

    if (event.target.value.length > 100) {
      event.target.value = event.target.value.substring(0, 100);
    }
  };

  const handleDescriptionChange = (event: { target: { value: string } }) => {
    setDescription(event.target.value);
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");

    if (event.target.value.length > 200) {
      event.target.value = event.target.value.substring(0, 200);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const imagesArray = Array.from(selectedImages) as File[];
      setImages(imagesArray);
    }
  };

  const handleSelectChange = (e: SetStateAction<string>) => {
    setSelectedValue(e);
    setShowAlert(e === "");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePriceChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const onlyNumbersAndCurrency = value.replace(/[^0-9$Bs]/g, "");
    setPrice(onlyNumbersAndCurrency);
  };

  const handleSelectCapacity = (e: SetStateAction<string>) => {
    setCapacity(e);
  };

  const handleRegister = async () => {
    console.log(selectedValue);

    if (name.trim() === "") {
      setNameError(
        "¡El campo del nombre de la habitación no puede estar vacío!"
      );
    } else {
      setNameError("");
    }

    if (description.trim() === "") {
      setDescriptionError(
        "¡El campo de descripción de la habitación no puede estar vacío!"
      );
    } else {
      setDescriptionError("");
    }

    if (images.length === 0) {
      setImagesError(
        "¡Debes seleccionar al menos una imagen para la habitación!"
      );
    } else {
      setImagesError("");
    }

    if (selectedValue) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    if (price.trim() === "") {
      setPriceError(
        "¡El campo de precio de la habitación no puede estar vacío!"
      );
    } else {
      setPriceError("");
    }

    const newRoom = {
      nameRoom: name,
      description: Description,
      state: "Disponible",
      capacity: capacity,
      price: price,
      roomType: selectedValue,
      hotel_Id: "4",
    };
    console.log(newRoom);

    try {
      await fetch("http://localhost:8081/v1/rooms", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer" + getAuthToken(),
        },
        body: JSON.stringify({ newRoom }),
      });
    } catch { /* empty */ }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="ml-4">
        <div className="w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="text-xl">
            Nombre de la habitación
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Ingrese el nombre de la habitación"
            className="border-b border-gray-500 bg-transparent focus:outline-none w-full pr-10"
            onChange={handleChange}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>

        <div className="w-full max-w-lg items-center gap-1.5 mt-2">
          <Label htmlFor="description" className="text-xl">
            Descripcion
          </Label>
          <Textarea
            placeholder="Ingresa la descripcion de la habitacion"
            className="border-b border-gray-500 bg-transparent focus:outline-none w-full pr-10"
            onChange={handleDescriptionChange}
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
        </div>

        <div className="w-full max-w-sm items-center gap-1.5 mt-2">
          <Label className="text-xl ">Imagenes</Label>
          <Input
            id="pictures"
            className="border-b border-gray-500 bg-transparent focus:outline-none w-full pr-10"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <Label className="text-sm text-gray-500">
            Selecciona hasta 10 imágenes
          </Label>
          {imagesError && <p className="text-red-500">{imagesError}</p>}
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl">Tipo</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] border-b border-gray-500 bg-transparent focus:outline-none">
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
          {showAlert && (
            <p className="text-red-500">¡Debes seleccionar un tipo!</p>
          )}
        </div>

        <div className="items-center gap-1.5 mt-2">
          <Label className="text-xl" htmlFor="price">
            Precio
          </Label>
          <Input
            type="text"
            id="price"
            placeholder="Ingrese el precio por día de la habitación"
            className="border-b border-gray-500 bg-transparent focus:outline-none pr-10 w-72"
            onChange={handlePriceChange} // Manejar el cambio de valor
          />
          {priceError && <p className="text-red-500">{priceError}</p>}
        </div>

        <div className="w-full max-w-sm items-center gap-1.5 mt-2">
          <Label className="text-xl">Cantidad</Label>
          <Select onValueChange={handleSelectCapacity}>
            <SelectTrigger className="w-[280px] border-b border-gray-500 bg-transparent focus:outline-none">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="hover:bg-black hover:text-white">
                <SelectLabel>
                  Capacidad de personas en la habitacion
                </SelectLabel>
                <SelectItem value="1">1 persona</SelectItem>
                <SelectItem value="2">2 personas</SelectItem>
                <SelectItem value="3">3 personas</SelectItem>
                <SelectItem value="4">4 personas</SelectItem>
                <SelectItem value="5">5 personas</SelectItem>
                <SelectItem value="6">6 personas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Button className="" onClick={handleRegister}>
            Registrar
          </Button>
        </div>
      </div>
    </div>
  );
};
