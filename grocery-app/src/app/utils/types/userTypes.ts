export interface ProductImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    width: number;
    height: number;
    hash: string;
    formats: {
      large?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      thumbnail: ImageFormat;
    };
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    locale: string | null;
  }
  
  export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    locale: string | null;
  }
  
  export interface Product {
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
    categories: Category[]; // Array de categorias associadas ao produto
    images: ProductImage[]; // Array de imagens associadas ao produto
    localizations: any[]; // Localizações, que podem ser um array vazio
  }
  