import { Check, ChevronsUpDown, CommandIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { CustomerModel } from "@/modules/booking/models/customer"
 
const frameworks = [
  {
    value: "next.js",
    label: "Luis Mejia",
  },
  {
    value: "sveltekit",
    label: "Gerardo Morales",
  },
  {
    value: "nuxt.js",
    label: "Juan Perez Flores",
  },
  {
    value: "remix",
    label: "Maria Quisbert",
  },
]

interface ComboBoxProps {
  addSelectedCustomer: (customer: CustomerModel) => void,
  removeSelectCustomer: (id: string) => void,
  listCustomer: CustomerModel[],
  onDeleteCustomer: (customer: CustomerModel) => void
  valueInit: CustomerModel | null
}
 
export function Combobox({
  addSelectedCustomer,
  removeSelectCustomer,
  listCustomer,
  onDeleteCustomer,
  valueInit,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<CustomerModel>()

  // const getLabel = ()=>{
  //   console.log(value)
  //   const customer = listCustomer.find((customer) => {
  //     // const name = (`${customer?.firstName} ${customer?.lastName}`).toLocaleLowerCase()
  //     // return name === value
  //     return customer.id === value?.id
  //   })
    
  //   return customer != undefined ? `${customer?.firstName} ${customer?.lastName}` : ''
  // }

  useEffect(()=>{
    if(valueInit != null){
      setValue(valueInit)
    }
  },[])
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between m-1"
        >
          {value
            ? `${value?.firstName} ${value?.lastName}`
            : "(Espacio disponible)"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={listCustomer.length > 0 ? 'Buscar cliente' : 'No hay clientes para buscar'} />
          <CommandEmpty>No se encontraron resultados</CommandEmpty>
          <CommandGroup>
            {value
            ? <CommandItem
              onSelect={()=>{
                if (value) {
                  onDeleteCustomer(value)
                  setValue(undefined)
                  removeSelectCustomer(value.id)
                }
              }}
            >
              Eliminar Seleccion
            </CommandItem>
            :null}
            {listCustomer.map((customer) => (
              <CommandItem
                key={`${customer.id}-${customer.firstName}`}
                value={customer.id}
                onSelect={(currentValue) => {
                  console.log(currentValue)
                  setValue(currentValue === (`${value?.firstName} ${value?.lastName}`).toLocaleLowerCase() ? undefined : customer)
                  setOpen(false)
                  if (currentValue === (`${value?.firstName} ${value?.lastName}`).toLocaleLowerCase()) {
                    removeSelectCustomer(customer.id)
                  } else {
                    addSelectedCustomer(customer)
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value? value?.id === customer.id ? "opacity-100" : "opacity-0" : "opacity-0"
                  )}
                />
                {`${customer.firstName} ${customer.lastName}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}