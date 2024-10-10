'use client';

import { useState, useEffect } from "react";
import { getSlider } from "../utils/GlobalService";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from "next/image";
import { Slice } from "lucide-react";


const Sliders = () => {

  interface MediaFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  }
  
  interface Media {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small: MediaFormat;
      thumbnail: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  }
  
  interface DataItem {
    id: number;
    documentId: string;
    caramelo: string;
    type: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    media: Media[];
  }

  const [slider, setSlider] = useState<DataItem[]>([]);
  
  useEffect(() => {
    getSlider().then((response) => {
      setSlider(response.data.data);
      console.log(response.data.data[0].media[0].url);
    });
  }, []);

  return (
    <div className="w-full-screen h-full-screen">
      <Carousel>
        <CarouselContent>
          {slider.map((item, index) => (
            <CarouselItem key={index} 
            className="md:basis-1/2 lg:basis-1/3">
              {item.media && item.media.length > 0 && (
                <Image
                  width={1000}
                  height={1000}
                  className="w-full"
                  src={"http://localhost:1337"+item.media[0].url} 
                  alt={item.media[0].alternativeText || 'image-slider'}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Sliders;
