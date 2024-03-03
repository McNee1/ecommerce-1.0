export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductApiResponse {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductSchema {
  products: ProductData[] | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}
