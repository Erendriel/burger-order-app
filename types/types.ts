export type ProductType = {
    id: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    calorie?: number;
    slug?: string;
  };

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

  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
  }

  export type ActionTypes = {
    addToCart: (item:CartItemType) => void;
    removeFromCart:(item:CartItemType) =>void;
    clearCart:()=>void;
    decreaseQuantity: (item:CartItemType) => void;
    increaseQuantity:(item:CartItemType) =>void;
  }