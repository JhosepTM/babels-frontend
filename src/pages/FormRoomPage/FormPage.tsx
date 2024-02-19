import Header from "@/components/ui/Header";
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

const customInputStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid white",
  borderRadius: "4px",
  padding: "8px 12px",
};

const customSelectStyle = {
  color: "white",
  backgroundColor: "transparent", // Added this line
};

export const FormPage = () => {
  return (
    <div className="bg-gray-950">
      <Header showBackButton={true} backRoute="/madmin/rooms" />
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="text-white font-bold text-xl">
            Nombre de la habitacion
          </Label>
          <Input
            type="name"
            id="name"
            placeholder="Ingrese el nombre de la habitacion"
            style={customInputStyle}
          />
        </div>

        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="description" className="text-white font-bold text-xl">
            Descripcion
          </Label>
          <Textarea
            placeholder="Ingresa la descripcion de la habitacion"
            className="text-white"
            style={customInputStyle}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-white font-bold text-xl">Imagenes</Label>
          <Input id="pictures" type="file" accept="image/*" multiple style={customInputStyle} />
          <span className="text-sm text-gray-500">
            Selecciona hasta 10 imágenes
          </span>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-white font-bold text-xl">Tipo</Label>
          <Select>
            <SelectTrigger className="w-[180px]" style={customSelectStyle}>
              <SelectValue placeholder="Seleccionar" style={customSelectStyle} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de habitacion</SelectLabel>
                <SelectItem value="apple">Basico</SelectItem>
                <SelectItem value="banana">Medio</SelectItem>
                <SelectItem value="blueberry">Gold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-white font-bold text-xl">Precio</Label>
          <Input
            type="price"
            placeholder="Ingrese el precio por dia de la habitacion"
            style={customInputStyle}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-white font-bold text-xl">Cantidad</Label>
          <Select>
            <SelectTrigger className="w-[280px]" style={customSelectStyle}>
              <SelectValue placeholder="Seleccionar" style={customSelectStyle} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel >Capacidad de personas en la habitacion</SelectLabel>
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

        <div>
          <Button>Registrar</Button>
        </div>
      </div>
    </div>
  );
};



