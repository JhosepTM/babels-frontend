import { Input } from "@/components/ui/input"
import { CustomerModel } from "@/modules/booking/models/customer"
import { getCustomersByCiOrPassport } from "@/modules/booking/services/customer-service"
import { Card } from "@tremor/react"
import { useState } from "react"
import { XCircle } from "lucide-react"

interface SearchCustomerProps {
    onSelect: (cutomer: CustomerModel) => void
}
export function SearchCustomer({onSelect}: SearchCustomerProps) {

    const [customers, setCustomers]=useState<CustomerModel[]>([])
    const [openModal, setOpenModal]=useState(false)
    const [loading, setLoading]=useState(false)

    const onSearch = async (value: string) =>{
        if(value.length == 0){
            setCustomers([])
        } else {
            setLoading(true)
            getCustomersByCiOrPassport(value).then((list)=>{
                if (list != null) {
                    console.log(list)
                    setCustomers(list)
                    setLoading(false)
                }
            })
        }
        
    }

    // return (
    //     <SearchSelect placeholder="Buscar cliente por CI" icon={Search} onSearchValueChange={(e)=>{onSearch(e)}}>
    //         <p>dsssssssss</p>
    //         {
    //             customers.map((c)=><SearchSelectItem key={c.lastName+"-"+c.email} value={c.ci}>{c.firstName+' '+c.lastName}</SearchSelectItem>)
    //         }
    //     </SearchSelect>
    // )

    return (
        <div className="relative">
            <Input type="text" placeholder="Buscar por ci de cliente"
                onFocus={()=>{setOpenModal(true)}}
                // onBlur={()=>setOpenModal(false)}
                onChange={(e)=>onSearch(e.target.value)}
                autoComplete="off"
            />
            {openModal?<Card className="mx-auto max-w-md absolute bg-gray-50 z-30 my-2">
            <div className="flex justify-between">
                <p className="text-tremor-content-stron font-normal">Lista de coincidencias</p>
                <button 
                    onClick={()=> setOpenModal(false)}>{<XCircle />}</button>
            </div>
            <div className="flex flex-col mt-2">
                {loading? <p>cargando...</p> : customers.length == 0 ? <p className="text-sm">No hay clientes para mostrar</p>
                :customers.map((item) => (
                <button 
                    key={item.lastName+""+item.email}
                    className="flex justify-between p-2 hover:bg-slate-200"
                    onClick={()=>{
                        onSelect(item)
                        setOpenModal(false)
                    }}>
                        <span>{item.firstName} {item.lastName}</span>
                        <span>{item.email}</span>
                </button>
                ))}
            </div>
            </Card>:<span></span>}

        </div>
        
    )
}
