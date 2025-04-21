<template>
  <footer class="bg-gray-800 text-white py-6 mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-sm">&copy; 2025 MyShop. All rights reserved.</p>

      <div class="mt-3 space-x-4">
        <router-link
          to="/privacy"
          class="text-gray-400 hover:text-white transition"
        >
          Privacy Policy
        </router-link>
        <router-link
          to="/terms"
          class="text-gray-400 hover:text-white transition"
        >
          Terms of Service
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
