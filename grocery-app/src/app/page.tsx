"use client";

import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Products from "./_components/Products";
import Sliders from "./_components/Sliders";


export default function Home() {


  return (
    <div>
      <Sliders/>
      <CategoryList/>

      <Products/>

      <Image
        src="/banner.png"
        alt='banner'
        width={1000}
        height={30}
        className="w-full h-[400px] object-contain" 

      />
     

    </div>
  );
}
