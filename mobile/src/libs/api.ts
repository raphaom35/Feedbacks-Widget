import axios from 'axios';
export const api = axios.create({
    baseURL: 'https://feedbacks-widget-production.up.railway.app/',
})