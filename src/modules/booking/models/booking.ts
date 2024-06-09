import { CustomerModel } from "./customer";
import { RoomModel } from "./room";

export interface BookingDetailModel {
    idBooking: number,
    customerBooking: CustomerModel,
    roomCustomerDetailList: RoomCustomerDetail[],
    amountPaid: number,
    code: string,
    checkIn: boolean,
    checkOut: boolean,
    createdAt: Date,
    paymentStatus: string
}

export interface RoomCustomerDetail {
    customerList: CustomerModel[],
    room: RoomModel,
    stateCheckIn: boolean,
    stateCheckOut: boolean
}

export interface BookingModel {
    customer: CustomerModel,
    customerList: CustomerModel[]
    roomCustomerList: RoomCustomer[]
}

export class Booking {
    private _customer: CustomerModel | null
    private _customerList: CustomerModel[] | null

    constructor() {
        this._customer = null
        this._customerList = null
    }

    get customer() {
        return this._customer
    }

    get customerList() {
        return this._customerList
    }

    set setCustomer(value: CustomerModel) {
        this._customer = value
    }

    set setCustomerList(value: CustomerModel[]) {
        this._customerList = value
    }
}

export class RoomCustomer {
    private _idRoom: string | null
    private _customerList: CustomerModel[] | null

    constructor() {
        this._idRoom = null
        this._customerList = null
    }

    get idRoom() {
        return this._idRoom
    }

    get customerList() {
        return this._customerList
    }

    set setIdRoom(value: string) {
        this._idRoom = value
    }

    set setCustomerList(value: CustomerModel[]) {
        this._customerList = value
    }
}