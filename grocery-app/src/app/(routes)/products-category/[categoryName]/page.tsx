'use client';

import { getProductsList, getCategory } from "@/app/utils/GlobalService";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Product } from "../../../utils/types/userTypes";
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

import Modal from "../../../_components/Modal";

const ProductCategory = ({params}: any) => {

    const [categoryList, setCategoryList] = useState <any[]> ([]);
    const [products, setProducts] = useState <any[]> ([]);



    const RenderList = () => {
        getCategory().then((response) => { 
            setCategoryList(response.data.data);
            
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    }

    const ProductList = () => {
        getProductsList(params.categoryName).then(products => {
            setProducts(products.data.data);
        });
    }


    useEffect(() => {
        RenderList();
        ProductList();
    }, []);



  return (
    <>
    <h2 className="bg-primary text-white font-bold text-center text-3xl p-5 mt-10"> {params.categoryName} </h2>
    <section className='flex items-center mt-5 gap-5 overflow-auto mx-7 lg:justify-center'>

        
        {categoryList.length > 0 && categoryList.map((category, index) => {
        
        return (

         
          <Link href={'/products-category/'+ category.name} key={index} className='flex flex-col items-center bg-green-50 hover:bg-green-300 gap-2 p-3 rounded-lg group-[]: w-[150px] min-w-[100px]'>
                
                <Image

                    src={"http://localhost:1337"+category.icon[0].url}
                    alt={category.name}
                
                    width={50}
                    height={50}
                    className='hover:scale-125 transition-all ease-in-out cursor-pointer'

                />

                <h2 className='font-bold text-xl text-green-800'> {category.name} </h2>

            </Link>
       
        )
    })}
</section>

<div className="p-5 md:p-10">
<div className="mt-10">
        <h2 className="text-green-600 font-bold text-2xl ml-5"> Produtos em estoque </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        ">

            { products.length > 0 && products.map((prodt, index) => {
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
</div>
</>

)

}

export default ProductCategory;