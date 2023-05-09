<template>
  <nav>
    <router-link to="/latest">
      <div class="main-menu-logo">
        <img src="@/assets/logo.png" />
      </div>
    </router-link>
    <div class="main-menu">
      <router-link :to="`/comic/${props.lastComic}`">Latest</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/">Other Comics</router-link>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["lastComic"]);
</script>

<style scoped>
img {
  max-width: 200px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: calc(1024px - 5%);
  margin: 0 auto;
  padding: 30px 3%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: #d4af37;
}

@media screen and (max-width: 768px) {
  nav {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 26px;
  }
}
</style>
