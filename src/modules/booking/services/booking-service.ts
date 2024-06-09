import axios from "axios";
import { RoomModel } from "../models/room";
import { BookingDetailModel, BookingModel } from "../models/booking";

const token = localStorage.getItem("auth_token");

export const getRoomsByStateAndType = async (type: string, state: string): Promise<RoomModel[]> => {
    console.log(import.meta.env.VITE_APP_API_URL,'--------------------------');
    
    return axios
      .get(`${import.meta.env.VITE_APP_API_URL}/v1/rooms?type=${type}&state=${state}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        console.log(response['data'])
        return response['data'] as RoomModel[]
      })
      .catch((err) => {
        console.log(err)
        return []
      });
}

export const updateStatusRoom = async(room: RoomModel): Promise<RoomModel | null> => {
  console.log(room)
  return axios
  .put(`${import.meta.env.VITE_APP_API_URL}/v1/rooms/${room.idRoom}`, room,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data'] as RoomModel
  })
  .catch((err) => {
    console.log(err)
    return null
  });
}

export const createBooking =  async(data: unknown): Promise<unknown | null> => {
  return axios
  .post(`${import.meta.env.VITE_APP_API_URL}/v1/booking`, data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data']
  })
  .catch((err) => {
    console.log(err)
    return null
  });
}

export const getAllBookingDetailReserved =  async(code: string): Promise<BookingDetailModel[]> => {
  return axios
  .get(`${import.meta.env.VITE_APP_API_URL}/v1/booking/reserved/detail?code=${code}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data'] as BookingDetailModel[]
  })
  .catch((err) => {
    console.log(err)
    return []
  });
}

export const getAllBookingDetailRecord =  async(code: string): Promise<BookingDetailModel[]> => {
  return axios
  .get(`${import.meta.env.VITE_APP_API_URL}/v1/booking/record/detail?code=${code}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data'] as BookingDetailModel[]
  })
  .catch((err) => {
    console.log(err)
    return []
  });
}

export const getAllBookingDetailOccupied =  async(code: string): Promise<BookingDetailModel[]> => {
  return axios
  .get(`${import.meta.env.VITE_APP_API_URL}/v1/booking/occupied/detail?code=${code}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data'] as BookingDetailModel[]
  })
  .catch((err) => {
    console.log(err)
    return []
  });
}

export const dialOneCheckIn = async(idBooking: number, idRoom: number): Promise<boolean> => {
  return axios
  .post(`${import.meta.env.VITE_APP_API_URL}/v1/booking/check-in/one?idBooking=${idBooking}&idRoom=${idRoom}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then(() => {
    return true
  })
  .catch((err) => {
    console.log(err)
    return false
  });
}

export const dialOneCheckOut = async(idBooking: number, idRoom: number): Promise<boolean> => {
  return axios
  .post(`${import.meta.env.VITE_APP_API_URL}/v1/booking/check-out/one?idBooking=${idBooking}&idRoom=${idRoom}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then(() => {
    return true
  })
  .catch((err) => {
    console.log(err)
    return false
  });
}

export const dialAllCheckIn = async(idBooking: number): Promise<boolean> => {
  return axios
  .post(`${import.meta.env.VITE_APP_API_URL}/v1/booking/check-in/all?idBooking=${idBooking}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then(() => {
    return true
  })
  .catch((err) => {
    console.log(err)
    return false
  });
}

export const dialAllCheckOut = async(idBooking: number): Promise<boolean> => {
  return axios
  .post(`${import.meta.env.VITE_APP_API_URL}/v1/booking/check-out/all?idBooking=${idBooking}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then(() => {
    return true
  })
  .catch((err) => {
    console.log(err)
    return false
  });
}

export const updatePaymentStatus = async(idBooking: number, status: string): Promise<BookingModel | null> => {
  
  return axios
  .patch(`${import.meta.env.VITE_APP_API_URL}/v1/booking/${idBooking}/payment-status?status=${status}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  )
  .then((response) => {
    console.log(response['data'])
    return response['data'] as BookingModel
  })
  .catch((err) => {
    console.log(err)
    return null
  });
}