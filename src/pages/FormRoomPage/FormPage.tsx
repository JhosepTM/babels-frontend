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
  return (
    <div className="ml-4">
      <Header />
      <div>
        <div className="w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="font-bold text-xl">
            Nombre de la habitacion
          </Label>
          <Input
            type="name"
            id="name"
            placeholder="Ingrese el nombre de la habitacion"
            className="border-2 border-black"
          />
        </div>

        <div className="w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="description" className="font-bold text-xl">
            Descripcion
          </Label>
          <Textarea
            placeholder="Ingresa la descripcion de la habitacion"
            className="border-2 border-black"
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
          <span className="text-sm text-gray-500">
            Selecciona hasta 10 imágenes
          </span>
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl">Tipo</Label>
          <Select>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de habitacion</SelectLabel>
                <SelectItem value="Basico">Basico</SelectItem>
                <SelectItem value="Medio">Medio</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl">Precio</Label>
          <Input
            type="price"
            placeholder="Ingrese el precio por dia de la habitacion"
            className="border-2 border-black"
          />
        </div>

        <div className="w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-xl">Cantidad</Label>
          <Select>
            <SelectTrigger className="w-[280px] border-2 border-black">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
          <Button className="bg-zinc-950 hover:bg-zinc-700">Registrar</Button>
        </div>
      </div>
    </div>
  );
};
