
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  dataAiHint?: string;
  menu: MenuItem[];
  popularityIndex: number; // Higher is more popular
}

export interface MenuItem {
  id: string;
  name:string;
  description: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string;
  customizable?: boolean;
  restaurantId: string; // To know which restaurant it belongs to
}

export interface CartItem extends MenuItem {
  quantity: number;
  specialRequests?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  timestamp: string;
  // For simplicity, an order can contain items from multiple restaurants in the cart
  // but when "placed", it would typically be per restaurant or handled by a more complex backend.
  // For AI, order history might be simplified.
}

export interface OrderHistoryEntry {
  restaurantId: string;
  items: string[]; // item names or ids
  timestamp: string; // ISO date string
}
