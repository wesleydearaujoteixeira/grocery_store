'use client';

import { useState, useEffect } from "react";
import { getProducts } from "../utils/GlobalService";
import { Product } from "../utils/types/userTypes";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Ms_Madi } from "next/font/google";
import Modal from "./Modal";




const Products = () => {

  const [products, setProducts] = useState <Product[]> ([]);

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
        <h2 className="text-green-600 font-bold text-2xl ml-5"> Produtos em estoque </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        ">

            {products.length > 0 && products.map((prodt, index) => {
                return (
                    <div key={index} className="flex flex-col p-3 md:p-4 items-center 
                    justify-center gap-3 border rounded-lg bg-green-100 m-3 
                    hover:scale-105 hover:show-lg transition-all ease-in-out cursor-pointer">
                       

                        {prodt.images.length > 0 && (

                            <Image 
                                src={`http://localhost:1337${prodt.images[0].url}`} 
                                alt={prodt.name} 
                                width={150} 
                                height={150} 
                               
                            />
                        )}
                         <h3 className="text-lg text-green-600">{prodt.name}</h3>
                         <p className="text-gray-600 text-xl">R$ {prodt.sellingPrice}</p>
                        

              <Dialog>
                <DialogTrigger asChild>

                <Button variant="outline"
                         className="text-primary hover:text-white hover:bg-primary "
                         > Add to cart 
                         
                </Button>

                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      
                        <Modal
                          images={`http://localhost:1337${prodt.images[0].url}`}
                          description={prodt.description}
                          name={prodt.name}
                          price={prodt.sellingPrice}
                        />

                        
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Products