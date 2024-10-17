import axios from "axios";

export const globalApi = axios.create({
    baseURL: "http://localhost:1337/api"  
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

export const addToCartServices = (data: any, jwt: string) => globalApi.post('/user-carts', data, {
    headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }

});

export const getCartItems = (userId: string, jwt: string) => {
    return globalApi.get(`/user-carts?filters[userId][$eq]=${userId}&populate=*`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
}


export const deleteCartItem = (id: any, jwt: string) => globalApi.delete(`/user-carts/${id}`, {
    headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }

})

