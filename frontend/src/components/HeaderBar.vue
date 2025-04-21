<template>
  <header class="bg-gray-800 shadow sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
      <!-- Logo -->
      <h1 class="text-2xl font-bold text-indigo-600">MyShop</h1>

      <!-- Navigation -->
      <nav class="space-x-6">
        <router-link
          to="/"
          class="text-gray-700 hover:text-indigo-600 transition font-medium"
          active-class="font-semibold text-indigo-600 underline"
          exact
        >
          Home
        </router-link>

        <router-link
          to="/products"
          class="text-gray-700 hover:text-indigo-600 transition font-medium"
          active-class="font-semibold text-indigo-600 underline"
        >
          Products
        </router-link>

        <router-link
          to="/cart"
          class="text-gray-700 hover:text-indigo-600 transition font-medium"
          active-class="font-semibold text-indigo-600 underline"
        >
          Cart
        </router-link>

        <router-link
          to="/login"
          class="text-gray-700 hover:text-indigo-600 transition font-medium"
          active-class="font-semibold text-indigo-600 underline"
        >
          Login
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup></script>
