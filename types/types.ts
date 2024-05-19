export type Product = {
    id: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    calorie?: number;
    slug?: string;
    options?: { title: string; additionalPrice: number }[];
  }[];