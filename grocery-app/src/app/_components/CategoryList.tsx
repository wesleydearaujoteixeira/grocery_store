import { useState, useEffect } from 'react';
import { getCategory } from '../utils/GlobalService';
import Image from 'next/image';
import Link from 'next/link';



const CategoryList = () => {
    
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
      setCategoryList(response.data.data);
      
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  
  }

  useEffect(() => {
    getCategoryList();
  }, [])



  return (

    <div className='mt-10 ml-5 mb-10'> 
        <h2 className='text-green-600 text-2xl font-bold'> CategoryList </h2>
        <section className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 mt-5 gap-5'>
            {categoryList.length > 0 && categoryList.map((category, index) => {
                
                return (
        
                  <Link href={'/products-category/'+ category.name} key={index} className='flex flex-col items-center bg-green-50 hover:bg-green-300 gap-2 p-3 rounded-lg group-[]:'>
                        
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

    </div>
  )
}

export default CategoryList