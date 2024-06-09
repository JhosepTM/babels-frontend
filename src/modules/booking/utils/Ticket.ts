import { CustomerRoomModel } from "../models/customer";
import createPdf from "../services/pdf-service";
import { calcularMontoPago } from "./calculate";

const generateTicket = async (output:string, customerAssingList: CustomerRoomModel[]) => {
  const content= [
    {
      text: [
        'Hotel Natanael S.R.L',
        'Sucursal: Cobija - Pando',
        'Dirección: Av. Del Poeta N°1234'
      ].join('\n'),
      style: 'header',
      alignment: 'center',
      margin: [0, 25, 0, 10],
    },
    {
      canvas: [{ type: 'line', x1: 0, y1: 5, x2: 200, y2: 5, lineWidth: 1 }],
      margin: [0, 5, 0, 10],
      alignment: 'center'
    },
    {
      text: [
        'Comprobante de pago',
        'ORIGINAL',
        'NIT: 78123452115',
        'Autorización: 78453454510078454'
      ].join('\n'),
      margin: [0, 10, 0, 35],
      alignment: 'center',
      style: 'text',
    },
    {
      text: 'Usuario emisor: admin456',
      style: 'tClientLabel'
    },
    {
      text: 'Fecha de emisión: 10/05/2024',
      style: 'tClientLabel',
      margin: [0, 0, 0, 5],
    },
    {
      text: 'Datos del cliente: Sr. Luis Perez Flores',
      style: 'tClientLabel'
    },
    {
      text: 'CI: 92153587',
      style: 'tClientLabel'
    },
    {
      text: 'Detalles de la reserva',
      margin: [0, 10, 0, 5],
      style: 'text',
    },
    {
      style: 'tableExample',
      color: '#444',
      table: {
        widths: [68, 40, 30, 40], // Agrega un nuevo 'auto' para la nueva columna
        headerRows: 3,
        body: [
          [{ text: 'Lista de huéspedes', style: 'tHeaderLabel', alignment: 'center' }, { text: 'Habitación', style: 'tHeaderLabel', alignment: 'center' }, { text: 'Cant. de noches', style: 'tHeaderLabel', alignment: 'center' }, { text: 'Precio', style: 'tHeaderLabel', alignment: 'center' }], // Agrega el nuevo encabezado de columna
          ...customerAssingList.length > 0 
            ? prueba(customerAssingList)
            : ['','','','']
        ]
      }
    },
    {
      text: `Son: ${calcularMontoPago(customerAssingList)} Bolivianos`,
      margin: [0, 10, 0, 5],
      style: 'tClientLabel'
    },
    {
      text: [
        'NO SE ACEPTAN CAMBIOS NI DEVOLUCIONESo',
        '"Toda reproducción total o parcioal y/o el uso no autorizado',
        'de esta Nota Fiscal constituye un delito a ser sansionado',
        'conforme a la ley"'
      ].join('\n'),
      margin: [0, 10, 0, 35],
      alignment: 'center',
      style: 'text',
    },
    {
      qr: '20603831404|03|B002|000131|724.94|4,752.30|30/09/2023|1|70477554|v2Ez4sKStje4NiqcXiuTcmTtPwgbrqgnXpWPltJKEhk=|',
      fit: 115,
      alignment: 'center',
      eccLevel: 'Q',
      margin: [0, 10, 0, 3],
    },
  ]
  const response = await createPdf({content}, output)
  return response
}

export default generateTicket;

const prueba = (customerAssingList: CustomerRoomModel[]) => {
  const res = customerAssingList.flatMap((ca)=> {
    return ca.getListCustomer?.map((c,i)=>{
      if(i == 0) {
        console.log('entro', ca.getRoom?.nameRoom)
        return [{ text: `${c.firstName} ${c.lastName}`, style: 'tHeaderValue' }, { rowSpan: ca.getListCustomer?.length, text: `${ca.getRoom?.nameRoom}\nID: ${ca.getRoom?.idRoom}\ntipo: ${ca.getRoom?.roomType}`, style: 'tHeaderValue' }, { text: `${ca.getNightsOfBooking}`, alignment: 'center', style: 'tHeaderValue' }, { rowSpan: ca.getListCustomer?.length, text: `${ca.getRoom?.price} Bs.`, alignment: 'center', style: 'tHeaderValue' }]
      }
      else {
        return [{ text: `${c.firstName} ${c.lastName}`, style: 'tHeaderValue' }, '', { text: `${ca.getNightsOfBooking}`, alignment: 'center', style: 'tHeaderValue' }, '']
      }
    })
  })
  return res
}