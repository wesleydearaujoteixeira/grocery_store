import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCartServices } from "../utils/GlobalService";

type PropsTypes = {
    id: number;
    images: string;
    description: string;
    name: string;
    price: number;
}


const Modal = ({images, name, description, price, id}: PropsTypes) => {

    const jwt = localStorage.getItem('jwt') || '';
    const user = JSON.parse(localStorage.getItem('user') || '');



    const router = useRouter();


    let [quantity, setQuantity] = useState <number> (1);
    const [loading, setLoading] = useState <boolean> (false);


    const result: number = quantity * price;


    const increaseQuantity = () => {
        setQuantity(quantity += 1);
    }

    const decreaseQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity += 1);

        }
        return quantity = 1;
    }

    const addToCart = () => {
        
        setLoading(true);

        if (!jwt) {

            const exit = confirm("Você precisa está logado, deseja se logar?");

            if (exit) {
              router.push('/login');
              return;
            }else{
                return;
            }
            
          }


        const data = {
            data: {
              quantity: quantity, 
              amount: result.toFixed(2), 
              users_permissions_users: user?.id,
              userId: user?.id,
              title: name,
              images: images,
              description: description
            },
          };

        addToCartServices(data, jwt).then((res) => {
            console.log(res);
            alert("Item adicionado ao carrinho com sucesso!");
            setLoading(false);

        }).catch((err) => {
            console.log(err);
            alert("Ocorreu um erro ao adicionar ao carrinho");
            setLoading(false);
        }).finally(() => {
            location.reload();
        });

      
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
                <div className="p-2 border flex gap-10 items-center justify-center md:items-center px-10">
                    <button className=" text-black font-bold" onClick={() => decreaseQuantity()}>-</button>
                    <h2> {quantity} </h2>
                    <button className=" text-black font-bold" onClick={() => increaseQuantity()}>+</button>
                </div>
            <h2 className="text-2xl font-bold"> {result.toFixed(1)} R$ </h2>
            
            <Button className="flex gap-3" onClick={() => addToCart()}>
                <ShoppingBasket/>
                {loading && <LoaderCircle className="animate-spin"/>}
                {!loading && 'Add to cart'}
            </Button>

        </div>


        
        
    </div>
  )
}

export default Modal