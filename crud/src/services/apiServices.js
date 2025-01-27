import axios from "axios";
import { toast } from 'react-hot-toast';

axios.defaults.withCredentials = true;
const BASE_URL = 'https://crud-operation-mern.onrender.com';
axios.defaults.baseURL = BASE_URL;

export const makeRequest = async (endPoint = '/', method = 'GET', data = null) => {
  try {
    const response = await axios({
      url: endPoint,
      method: method,
      data: data,
      timeout: 120000
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data || 'Something went wrong';
    console.error(errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Propagate error if needed
  }
};
