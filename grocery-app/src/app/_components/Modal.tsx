import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PropsTypes = {
    images: string;
    description: string;
    name: string;
    price: number;
}


const Modal = ({images, name, description, price}: PropsTypes) => {


    let [toggle, setToggle] = useState(1);

    const result = toggle * price;


    const increaseQuantity = () => {
        setToggle(toggle += 1);
    }

    const decreaseQuantity = () => {
        if(toggle > 1) {
            setToggle(toggle -= 1);
        }
        return toggle = 1;
    }


  return (
    <div className="grid grid-cols-1 grid-items-center place-items-center md:grid-cols-2 p-10 text-black gap-7">
      <Image 
            src={images} 
            alt={name} 
            width={800} 
            height={200}
            className=" h-[320px] w-[300px] object-fit rounded-lg"
                                            
        />

        <div className=" flex flex-col gap-3">
            <h2 className="text-2xl mb-2 font-bold"> {name} </h2>
            <p className="text-sm text-gray-500"> {description} </p>
            <div className="font-bold text-3xl">
                R$ {price}
            </div>
            <div>
                <div className="p-2 border flex gap-10 items-center px-10">
                    <button className=" text-black font-bold" onClick={() => decreaseQuantity()}>-</button>
                    <h2> {toggle} </h2>
                    <button className=" text-black font-bold" onClick={() => increaseQuantity()}>+</button>
                </div>
            </div>
            <h2 className="text-2xl font-bold"> {result.toFixed(2)} </h2>
            
            <Button className="flex gap-3">
                <ShoppingBasket/>
                Add to Cart
            </Button>

        </div>


        
        
    </div>
  )
}

export default Modal