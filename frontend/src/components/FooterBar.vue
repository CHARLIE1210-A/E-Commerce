<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="footer-text">&copy; 2025 MyShop. All rights reserved.</p>

      <div class="footer-links">
        <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
        <router-link to="/terms" class="footer-link">Terms of Service</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background-color: #1f2937; /* dark gray */
  color: #f9fafb; /* white */
  padding: 2rem 0;
  margin-top: 3rem;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-text {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.footer-link {
  color: #d1d5db; /* soft gray */
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
}
</style>
