import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();

const { API_HOST } = process.env;

if(!API_HOST) throw new Error('Заполните хост апи');

export const api = axios.create({
    baseURL: API_HOST
})