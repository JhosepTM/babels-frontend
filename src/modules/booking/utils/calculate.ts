import { CustomerRoomModel } from "../models/customer";

export const calcularMontoPago = (customerAssingList: CustomerRoomModel[]) => {
    let res = 0;
    customerAssingList.forEach((e)=>{
        if(e){
            res = res +( (e.getListCustomer? e.getListCustomer?.length : 0) * (e.getRoom? e.getRoom?.price : 0))
        }
    })
    return res;
}