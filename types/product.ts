export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    videoUrl: string | null;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    category: {
      id: number;
      name: string;
    };
    variants: {
      id: number;
      sku: string;
      name: string;
      price: number;
    }[];
    images: {
      id: number;
      url: string;
      alt: string;
    }[];
    specifications: {
      [key: string]: string | string[];
    };
    sellerCompany: string;
  }
  
  