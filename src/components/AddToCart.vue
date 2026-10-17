<template>
    <button 
      @click="handleAddToCart"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      افزودن به سبد خرید ({{ cartItems.length }})
    </button>
  </template>
  
  <script setup>
  import { useStore } from '@nanostores/vue';
  import { cart, addToCart } from '../store/cart';
  
  // خواندن واکنشی (Reactive) استیت
  const cartItems = useStore(cart);
  
  const props = defineProps({
    course: Object
  });
  
  const handleAddToCart = () => {
    addToCart(props.course);
    alert(`دوره ${props.course.title} به سبد اضافه شد!`);
  };
  </script>