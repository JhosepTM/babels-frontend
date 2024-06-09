import { RoomModel } from "./room"

export interface CustomerModel {
    id: string,
    firstName: string,
    lastName: string,
    ci: string,
    passport: string,
    phone: string,
    email: string,
    birthdate: Date
}

// export interface CustomerRoomModel {
//     room: RoomModel,
//     listCustomer: CustomerModel[],
//     nightsOfBooking: number
// }

export class CustomerRoomModel {
    private _room: RoomModel | null
    private _listCustomer: CustomerModel[] | null
    private _nightsOfBooking: number

    constructor() {
        this._room = null
        this._listCustomer = []
        this._nightsOfBooking = 0
    }

    get getRoom() {
        return this._room
    }

    get getListCustomer() {
        return this._listCustomer
    }

    get getNightsOfBooking() {
        return this._nightsOfBooking
    }

    set setRoom(value: RoomModel) {
        this._room = value
    }

    set setListCustomer(value: CustomerModel[]) {
        this._listCustomer = value
    }

    set setNightsOfBooking(value: number) {
        this._nightsOfBooking = value
    }
}