import axios from 'axios';

export const wmcApi = axios.create({
    baseURL: 'https://wheresmycolorapi.herokuapp.com/v1'
});