import { computed } from 'nanostores';
import { persistentJSON } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  title: string;
  price: number;
}

// در localStorage ذخیره می‌شود و بین تب‌ها همگام می‌ماند
export const cart = persistentJSON<CartItem[]>('astrolearn:cart', []);

export const cartCount = computed(cart, (items) => items.length);
export const cartTotal = computed(cart, (items) => items.reduce((sum, item) => sum + item.price, 0));

export const isInCart = (id: string) => cart.get().some((item) => item.id === id);

export function addToCart(item: CartItem) {
  if (!isInCart(item.id)) cart.set([...cart.get(), item]);
}

export function removeFromCart(id: string) {
  cart.set(cart.get().filter((item) => item.id !== id));
}

export function clearCart() {
  cart.set([]);
}
