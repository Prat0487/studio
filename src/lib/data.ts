import type { Restaurant, MenuItem, OrderHistoryEntry } from '@/types';

const commonMenuItems: Omit<MenuItem, 'id' | 'restaurantId'>[] = [
  { name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'pizza cheese', customizable: true },
  { name: 'Pepperoni Pizza', description: 'Pizza with pepperoni topping.', price: 14.99, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'pizza pepperoni', customizable: true },
  { name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', price: 8.99, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'salad dressing', customizable: true },
  { name: 'Spaghetti Carbonara', description: 'Pasta with creamy egg sauce, pancetta, and cheese.', price: 15.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'pasta carbonara', customizable: false },
  { name: 'Coca-Cola', description: 'Refreshing Coca-Cola.', price: 2.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'soda drink', customizable: false },
  { name: 'Tiramisu', description: 'Classic Italian dessert.', price: 7.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'dessert cake', customizable: false },
];

const sushiMenuItems: Omit<MenuItem, 'id' | 'restaurantId'>[] = [
  { name: 'Salmon Nigiri', description: 'Fresh salmon over rice.', price: 5.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sushi salmon', customizable: false },
  { name: 'Tuna Roll', description: 'Tuna maki roll.', price: 6.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sushi tuna', customizable: false },
  { name: 'California Roll', description: 'Crab, avocado, and cucumber roll.', price: 7.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sushi crab', customizable: false },
  { name: 'Miso Soup', description: 'Traditional Japanese soup.', price: 3.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'soup miso', customizable: false },
  { name: 'Edamame', description: 'Steamed soybeans.', price: 4.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'beans appetizer', customizable: false },
];

const burgerMenuItems: Omit<MenuItem, 'id' | 'restaurantId'>[] = [
  { name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion.', price: 10.99, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'burger beef', customizable: true },
  { name: 'Cheese Burger', description: 'Classic burger with cheese.', price: 11.99, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'burger cheese', customizable: true },
  { name: 'Fries', description: 'Crispy golden fries.', price: 4.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'fries potato', customizable: false },
  { name: 'Onion Rings', description: 'Battered and fried onion rings.', price: 5.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'onion rings', customizable: false },
  { name: 'Milkshake', description: 'Thick and creamy milkshake.', price: 6.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'milkshake drink', customizable: true },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Luigi\'s Pizzeria',
    cuisine: 'Italian',
    rating: 4.5,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'restaurant facade',
    popularityIndex: 5,
    menu: commonMenuItems.map((item, index) => ({ ...item, id: `1-${index}`, restaurantId: '1' })),
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sushi restaurant',
    popularityIndex: 4,
    menu: sushiMenuItems.map((item, index) => ({ ...item, id: `2-${index}`, restaurantId: '2' })),
  },
  {
    id: '3',
    name: 'Burger Barn',
    cuisine: 'American',
    rating: 4.2,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'burger joint',
    popularityIndex: 3,
    menu: burgerMenuItems.map((item, index) => ({ ...item, id: `3-${index}`, restaurantId: '3' })),
  },
  {
    id: '4',
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.6,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'italian eatery',
    popularityIndex: 4,
    menu: [
      ...commonMenuItems.slice(0,3).map((item, index) => ({ ...item, id: `4-${index}`, restaurantId: '4' })),
      { id: '4-3', name: 'Lasagna', description: 'Rich baked lasagna.', price: 16.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'pasta lasagna', customizable: false, restaurantId: '4' },
      { id: '4-4', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 5.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'bread garlic', customizable: false, restaurantId: '4' },
    ],
  },
   {
    id: '5',
    name: 'Healthy Bites',
    cuisine: 'Healthy',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'salad bar',
    popularityIndex: 5,
    menu: [
      { id: '5-0', name: 'Quinoa Salad', description: 'Healthy quinoa with fresh vegetables.', price: 12.00, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'salad quinoa', customizable: true, restaurantId: '5' },
      { id: '5-1', name: 'Avocado Toast', description: 'Smashed avocado on whole grain toast.', price: 9.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'toast avocado', customizable: true, restaurantId: '5' },
      { id: '5-2', name: 'Green Smoothie', description: 'Spinach, kale, and fruit smoothie.', price: 7.50, imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'smoothie green', customizable: false, restaurantId: '5' },
    ],
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

export const getMenuItemById = (restaurantId: string, itemId: string): MenuItem | undefined => {
  const restaurant = getRestaurantById(restaurantId);
  return restaurant?.menu.find(item => item.id === itemId);
}


export const mockOrderHistory: OrderHistoryEntry[] = [
  {
    restaurantId: '1',
    items: ['Margherita Pizza', 'Coca-Cola'],
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    restaurantId: '2',
    items: ['Salmon Nigiri', 'Tuna Roll', 'Miso Soup'],
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    restaurantId: '1',
    items: ['Pepperoni Pizza', 'Caesar Salad', 'Tiramisu'],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  }
];
