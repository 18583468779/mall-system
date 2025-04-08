<template>
  <template>
    <h1>Hello App!</h1>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/goods">Go to goods</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </template>
</template>

<script setup lang="ts"></script>

<style scoped></style>
