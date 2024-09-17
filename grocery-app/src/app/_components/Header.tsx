import React from 'react';
import Image from 'next/image';
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function Header() {
  return (
    <div className='p-5 shadow-sm flex justify-between'> 
        <div className='flex items-center gap-8'>
      <Image
        src="/grocery_stor.png"
        alt="Grocery Store Logo"  // Adding alt attribute for accessibility
        width={150}
        height={100}
      />
      <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <h2 className=' hidden md:flex gap-2 items-center cursor-pointer border rounded-full p-2 px-10 bg-slate-200'>
                <LayoutGrid className='h-5 w-5'/> Categoria
            </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className='flex gap-3 items-center border rounded-full p-2 px-5'>
        <Search/>
        <input type="text" placeholder='Search' className='border-none outline-none'/>
      </div>
        </div>
        <div className='flex gap-5 items-center'>
            <h2 className='flex gap-2 items-center text-lg'> <ShoppingBag/> 0  </h2>
            <Button> Login </Button>
        </div>
    </div>
  );
}

export default Header;
