import Header from "@/components/ui/Header"
import { Button } from "@/components/ui/button";
import { Label }  from "@/components/ui/label"
import { Input }  from "@/components/ui/input"




 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]


export const FormPage = () =>{

  return(
  <div className="bg-gray-950">
      <Header showBackButton={true} backRoute="/madmin/rooms" />
      <div>
       <Label className=""> Nombre</Label>
       <Input type="nombre" placeholder=" Ingrese el nombre de la habitacion"/>
       
       <Label className=""> Descripcion </Label>
       <Input type="nombre" placeholder=" Ingrese la descripcion de la habitacion"/>

       <Label className=""> Imagenes </Label>
       <Input type="nombre" placeholder=" Ingrese las imagenes de la habitacion"/>

       <Label className=""> Tipo </Label>

       <Label className=""> Precio </Label>
       <Input type="nombre" placeholder=" Ingrese el nombre de la habitacion"/>

       <Label className=""> Cantidad </Label>
       <Input type="nombre" placeholder=" Ingrese el nombre de la habitacion"/>

       <Button>Registrar</Button>
      </div>
  
  </div>
  );
};