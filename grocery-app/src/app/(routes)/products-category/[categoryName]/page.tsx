'use client';

import { getProductsList } from "@/app/utils/GlobalService";
import { useEffect } from "react";


const ProductCategory = ({params}: any) => {

    const RenderList = () => {
        getProductsList(params.categoryName).then(products => {
            console.log(products.data.data);
        });
    }

    useEffect(() => {
        RenderList();
    }, []);


  return (
    <div>
        <h2 className="p-4 bg-primary text-white font-bold text-2xl text-center">  {params.categoryName} </h2>
    </div>
  )
}

export default ProductCategory;