'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket, Trash2Icon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteCartItem, getCartItems, getCategory } from '../utils/GlobalService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUpdateCart } from '../context/UpdateContext';


function Header() {
  
 
  const [categoryList, setCategoryList] = useState<any []>([]);
  const [jwt, setJwt] = useState <boolean> (false);

  const user = JSON.parse(localStorage.getItem('user') || '');
  const token = localStorage.getItem('jwt') || '';


  const [basket, setBasket] = useState (0);
  const { cart, setCart } = useUpdateCart();


  let somaTotal = 0;

  for(let i = 0; i < cart.length; i++) {
      somaTotal += cart[i].amount;
  }


  const router = useRouter();

  useEffect(() => {
    // Sincroniza o estado com o localStorage
    const token = localStorage.getItem('jwt') || '';

    if(token) {
      setJwt(true); 
    }



  }, []);

  const getCategoryList = () => {
    getCategory()
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };


  const getBasket = () => { 
    getCartItems(user.id, token).then((response) => {
        console.log(response.data.data.length);
        setBasket(response.data.data.length);
        setCart(response.data.data);
        console.log(response.data.data);
  })
  }


  useEffect(() => {
    getCategoryList();
    getBasket();
  }, []);

  const LogOut = () => {
    localStorage.removeItem('jwt');
    setJwt(false); // Atualiza o estado para refletir o logout

    setTimeout(() => {
      router.push('/login');
      toast('Logged out');
    }, 1000);

  };


  const deleteItem = (id: any) => {


    deleteCartItem(id, token).then((response) => {
      console.log(response);
      console.log('Item deletado com sucesso!');
      getBasket();

    }).catch((error) => {
      console.log('Error:', error);
      alert('Ocorreu um erro ao deletar o item');
    })
    
    ;
  
  }

  return (
    <div className="p-1 shadow-sm flex justify-around">
      <div className="flex items-center gap-8">
        <Link href={'/'}>
          <Image
            src="/grocery_stor.png"
            alt="Grocery Store Logo"
            width={100}
            height={100}
          />
        </Link>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="hidden md:flex gap-2 items-center cursor-pointer border rounded-full p-2 px-10 bg-slate-200">
                <LayoutGrid className="h-5 w-5" /> Categoria
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <Link href={`/products-category/${category.name}`} key={index}>
                  <DropdownMenuItem className="flex gap-3 items-center justify-around cursor-pointer">
                    <Image
                      src={`http://localhost:1337${category.icon[0].url}`}
                      alt="url category"
                      width={20}
                      height={20}
                      unoptimized={true}
                    />
                    <h2 className="text-lg">{category.name}</h2>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none"
          />
        </div>
      </div>

      <div className="flex gap-5 items-center">
       


      <Sheet>
        <SheetTrigger>
            {jwt && (
              <h2 className="flex gap-2 items-center text-lg cursor-pointer">
              <ShoppingBasket/> <span className='bg-primary text-white font-bold rounded-full px-3'> {basket} </span>
            </h2>
            )}
        </SheetTrigger>
        <SheetContent>
  <SheetHeader>
    <SheetTitle className="bg-primary p-3 font-bold text-2xl rounded-md text-center text-white">
      My Cart
    </SheetTitle>

    {/* Limitar altura e ativar rolagem */}
    <SheetDescription className="overflow-y-auto max-h-[600px] p-4">
      {cart && cart.map((cartItem) => (
        <aside key={cartItem.id} className="flex justify-between items-center p-2 mb-5">
          <div className="flex flex-col justify-between gap-2">
            <Image
              src={`${cartItem.images}`}
              alt="product image"
              width={90}
              height={90}
              unoptimized={true}
            />
            <div className="flex flex-col">
              <h2 className="font-bold">{cartItem.title}</h2>
              <h3 className="text-sm font-bold">Quantity: {cartItem.quantity}</h3>
              <h2 className="text-lg font-bold">R$ {cartItem.amount}</h2>
            </div>
            <hr />
          </div>
          <Trash2Icon className='cursor-pointer' onClick={() => deleteItem(cartItem.id)} />
        </aside>
      ))}

      {/* Subtotal e botão na parte inferior */}
      <div className="absolute w-[90%] bottom-6 flex flex-col">
        <h1 className="text-lg font-bold flex justify-between mr-4">
          Subtotal R$ <span>{somaTotal.toFixed(2)}</span>
        </h1>
        <Button className='mr-10'>View Cart</Button>
      </div>
    </SheetDescription>
  </SheetHeader>
</SheetContent>

      </Sheet>



        {jwt ? (

    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
                <CircleUserRound className='bg-green-100 p-2 rounded-full cursor-pointer text-primary h-12 w-12'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> My Profile </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            My account
          </DropdownMenuItem>

          <DropdownMenuItem>
            My order
          </DropdownMenuItem>

          <DropdownMenuItem className='cursor-pointer font-bold' onClick={() => LogOut()}>
            Log Out
          </DropdownMenuItem>
  
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
