'use client';

import { useState, useEffect } from "react";
import { getProducts } from "../utils/GlobalService";
import { ImagesTypesProduct } from "../utils/types/userTypes";
import Image from "next/image";




const Products = () => {

  const [products, setProducts] = useState <ImagesTypesProduct[]> ([]);

  const GetProducts = () => {
    
    getProducts().then(response => {
        console.log(response.data.data);
        setProducts(response.data.data);

      }).catch(err => console.log(err));
    
  }

  useEffect(() => {
    GetProducts();
  }, []);


  return (
    <div className="mt-10">
        <h2 className="text-green-600 font-bold text-xl"> Produtos em estoque </h2>
        <div>
            {products.length > 0 && products.map((prodt, index) => {
                return (
                    <div key={index} className="flex gap-3 items-center mt-5">
                        <Image 
                            src={"http://localhost:1337"+prodt?.url} 
                            alt={prodt.name} 
                            width={100} height={100} 
                        />


                        <h3 className="text-lg">{prodt.name}</h3>
                        <p className="text-gray-600">R$ {prodt.sellingPrice}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Products