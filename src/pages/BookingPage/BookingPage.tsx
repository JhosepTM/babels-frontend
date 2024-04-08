import { useState } from "react";
import { AvailableRooms } from "./AvailableRooms";
import { OccupiedRooms } from "./OccupiedRooms";
import { BookingRecord } from "./BookingRecord";

export const BookingPage = () => {

    const [tab, setTab] = useState(1)


    return <>
        <p className="w-full h-[50px] bg-black"></p>
        <h1 className="text-4xl font-bold m-2 ml-10">Sistema de Reserva</h1>
        <div>
            <div className="flex mx-10">
                <p className={`px-6 py-2 cursor-pointer ${tab == 1 ? 'bg-slate-200' : 'bg-slate-100'}`} onClick={() => { setTab(1) }}>Habitaciones Disponibles</p>
                <p className={`px-6 py-2 cursor-pointer ${tab == 2 ? 'bg-slate-200' : 'bg-slate-100'}`} onClick={() => { setTab(2) }}>Habitaciones Ocupadas</p>
                <p className={`px-6 py-2 cursor-pointer ${tab == 3 ? 'bg-slate-200' : 'bg-slate-100'}`} onClick={() => { setTab(3) }}>Historial de Reservas</p>
            </div>
            {tab == 1
                ? <div className={'h-[80vh] w-full flex'}>
                    <AvailableRooms />
                </div>
                : tab == 2
                    ? <div className={'h-[80vh] w-full flex'}>
                        <OccupiedRooms />
                    </div>
                    : <div className={'h-[80vh] w-full flex'}>
                        <BookingRecord />
                    </div>
            }
        </div>
    </>;
}