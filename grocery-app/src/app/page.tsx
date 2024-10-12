"use client";

import CategoryList from "./_components/CategoryList";
import Header from "./_components/Header";
import Products from "./_components/Products";
import Sliders from "./_components/Sliders";


export default function Home() {


 


  return (
    <div>
      <Header/>
      <Sliders/>
      <CategoryList/>
      {/* Products */}
      <Products/>

    </div>
  );
}
