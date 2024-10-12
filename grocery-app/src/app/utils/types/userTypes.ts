export interface ThumbnailFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number; // em KB
    width: number;
    height: number;
    sizeInBytes: number; // em bytes
  }
  
  export interface Formats {
    thumbnail: ThumbnailFormat;
  }


  
  
  export interface ImagesTypesProduct {
    id: number;
    documentId: string;
    name: string;
    description: string;
    mrp: number; // Preço máximo de venda
    sellingPrice: number; // Preço de venda
    itemQualityType: string; // Qualidade ou quantidade, como "500g"
    slug: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    locale: string | null;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number; // em KB
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
   
  }
  