<template>
  <div class="app-container">
    <!-- Header -->
    <Header />

    <!-- Main Content Area -->
    <main class="main-content">
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

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.main-content {
  flex-grow: 1;
  max-width: 1600px;
  margin: 0 1.5rem;
  /* padding: 2rem; */
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
