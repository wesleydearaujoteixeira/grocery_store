"use client";

import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Header from "./_components/Header";
import Products from "./_components/Products";
import Sliders from "./_components/Sliders";
import Footer from "./_components/Footer";


export default function Home() {


 


  return (
    <div>
      <Header/>
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

      {/* Footer */}

      <Footer/>

    </div>
  );
}
