export interface ProductData {
  brand: string;
  category: string;
  countInCart?: number;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ProductApiResponse {
  limit: number;
  products: ProductData[];
  skip: number;
  total: number;
}

export interface ProductSchema {
  error: null | string;
  products: ProductData[] | null;
  status: 'failed' | 'idle' | 'pending' | 'succeeded';
}
