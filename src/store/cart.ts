import { atom } from 'nanostores';

export interface CartItem {
  id: string;
  title: string;
  price: number;
}

export const cart = atom<CartItem[]>([]);

export function addToCart(course: CartItem) {
  cart.set([...cart.get(), course]);
}