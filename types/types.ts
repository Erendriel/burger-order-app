export type Product = {
    id: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    calorie?: number;
    slug?: string;
  }[];

  export type OrderType = {
    id: string;
    userEmail: string;
    price: number;
    products: CartItemType[];
    status: string;
    createdAt: Date;
    intent_id?: string;
  }

  export type CartItemType = {
    id:string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
  }