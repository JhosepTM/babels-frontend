import { useState } from "react"

export const RoomCountItem = () => {
    const [cant, setCant] = useState(1)
    return (
        <div
            className="flex items-center justify-between bg-gray-100 px-2 rounded-sm"
        >
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                    Habitacion #3
                </p>
                <p className="text-sm text-muted-foreground">
                    Personas Por Habitacion
                </p>
            </div>
            <div className="flex items-center">
                <span 
                    className="w-6 h-6 rounded-full bg-gray-500 text-white font-bold text-center cursor-pointer"
                    onClick={()=>setCant(cant == 1 ? 1 : cant -1 )}
                    >-</span>
                <input className="w-10 bg-slate-100 p-1 m-1 text-center" type="number" value={cant} />
                <span 
                    className="w-6 h-6 rounded-full bg-gray-500 text-white text-center cursor-pointer"
                    onClick={()=>setCant(cant + 1 )}
                    >+</span>
            </div>
        </div>
    )
}