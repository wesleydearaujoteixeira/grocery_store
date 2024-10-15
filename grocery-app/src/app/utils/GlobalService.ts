import axios from "axios";

export const globalApi = axios.create({
    baseURL: "http://localhost:1337/api/"  
})


export const getCategory = () => globalApi.get('/categories?populate=*');

export const getSlider = () => globalApi.get('/sliders?populate=*');

export const getProducts = () => globalApi.get('/products?populate=*');

export const getProductsList = (categoryName: string) => 
    globalApi.get(`/products?filters[categories][name][$in]=${encodeURIComponent(categoryName)}&populate=*`);
  
export const register = (username: string, email: string, pass: string) => globalApi.post('/auth/local/register', {
    username: username,
    email: email,
    password: pass    
});

export const login = (email: string, pass: string) => globalApi.post('/auth/local', {
    identifier: email,
    password: pass
});