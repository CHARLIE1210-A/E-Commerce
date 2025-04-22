<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <h1 class="logo">MyShop</h1>

      <!-- Navigation -->
      <nav class="nav-links">
        <router-link to="/" class="nav-link" active-class="active-link" exact>Home</router-link>
        <router-link to="/products" class="nav-link" active-class="active-link">Products</router-link>
        <router-link to="/cart" class="nav-link" active-class="active-link">Cart</router-link>
        <router-link to="/login" class="nav-link" active-class="active-link">Login</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  background-color: #1f2937; /* deep gray */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4f46e5; /* Indigo */
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #e5e7eb; /* light gray */
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #818cf8; /* lighter indigo */
}

.active-link {
  font-weight: 600;
  color: #4f46e5;
  border-bottom: 2px solid #4f46e5;
  padding-bottom: 2px;
}
</style>
