'use client';

import { useEffect, useState } from 'react';
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

import { getCategory } from '../utils/GlobalService';
  

function Header() {

  interface TypesCategory {
    color: string; 
    createdAt: string;
    documentId: string;
    id: number;
    locale: null | string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    icon: ImageMetadata[]
    
  
  }

  interface ImageMetadata {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    documentId: string;
    ext: string;
    formats: {
      small: FormatDetails;
      thumbnail: FormatDetails;
    };
    hash: string;
    height: number;
    id: number;
    locale: string | null;
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    publishedAt: string;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  }
  
  interface FormatDetails {
    url: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    width: number;
    height: number;
  }
  



  const [categoryList, setCategoryList] = useState <TypesCategory[]> ([]);


  const getCategoryList = () => { 
    getCategory().then((response) => { 
      console.log(process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
      setCategoryList(response.data.data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  
  }


 useEffect(() => {
  getCategoryList();
 }, []);



  return (
    <div className='p-5 shadow-sm flex justify-between'> 
        <div className='flex items-center gap-8'>
      <Image
        src="/grocery_stor.png"
        alt="Grocery Store Logo"  
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
                <DropdownMenuLabel> Category </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categoryList.map((category, index) => (

                      <DropdownMenuItem key={index} className='flex gap-3 items-center justify-around cursor-pointer'> 
                      <Image
                         src={"http://localhost:1337"+category.icon[0].url.toString()}
                         alt='url category'
                         width={30}
                         height={30}
                         unoptimized={true}
                      />
                        
                      <h2 className='text-lg'> {category?.name} </h2>
                  
                    </DropdownMenuItem>

                ))}
                
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
