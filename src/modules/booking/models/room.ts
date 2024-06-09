export interface RoomModel {
    id: string,
    numberRoom: string,
    description: string,
    idRoom: number,
    nameRoom: string,
    price: number,
    roomType: RoomType,
    state: RoomState
    capacity: number
}

export enum RoomType {
    SIMPLE = 'SIMPLE',
    DOBLE = 'DOBLE',
    MATRIMONIAL = 'MATRIMONIAL'
}

export enum RoomState {
    DISPONIBLE = 'DISPONIBLE',
    OCUPADA = 'OCUPADA',
    RESERVADA = 'RESERVADA',
    EN_TRANSITO = 'EN_TRANSITO'
}