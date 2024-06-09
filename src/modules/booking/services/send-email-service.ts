import axios from "axios";
import { EmailModel } from "../models/email";

const token = localStorage.getItem("auth_token");

export const sendEmailCustomer = async(email: EmailModel): Promise<boolean> => {
    return axios
    .post(`${import.meta.env.VITE_APP_API_URL}/send-email`, email,
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