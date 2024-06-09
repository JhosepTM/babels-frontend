export const formatearFecha = (fecha: Date) =>{
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
  
    return `${(dia < 10) ? '0' + dia : dia}/${(mes < 10) ? '0' + mes : mes}/${anio}`;
  }