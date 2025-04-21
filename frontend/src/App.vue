<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <Header />

    <!-- Main Content Area -->
    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderBar.vue'
import Footer from './components/FooterBar.vue'
</script>

