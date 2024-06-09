import axios from "axios";
import { CustomerModel } from "../models/customer";

const token = localStorage.getItem("auth_token");


export const createCustomer = async(customer: CustomerModel): Promise<CustomerModel | null> => {
    return axios
    .post(`${import.meta.env.VITE_APP_API_URL}/v1/customer`, customer,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    .then((response) => {
      console.log(response['data'])
      return response['data'] as CustomerModel
    })
    .catch((err) => {
      console.log(err)
      return null
    });
  }

export const getCustomersByCiOrPassport = (ciPass: string) => {
    return axios
    .get(`${import.meta.env.VITE_APP_API_URL}/v1/customer/${ciPass}/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    .then((response) => {
      console.log(response['data'],'--------')
      return response['data'] as CustomerModel[]
    })
    .catch((err) => {
      console.log(err)
      return null
    });
}