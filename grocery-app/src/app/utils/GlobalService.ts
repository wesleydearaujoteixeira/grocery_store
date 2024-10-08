import axios from "axios";

export const globalApi = axios.create({
    baseURL: "http://localhost:1337/api/"  
})


export const getCategory = () => globalApi.get('/categories?populate=*');



