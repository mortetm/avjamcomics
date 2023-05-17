<template>
  <footer>
    <SocialLinks></SocialLinks>
    <div>
      © AVJAMComics 2023 | <router-link to="/">All Comics</router-link> |
      <router-link to="/shop">Shop</router-link> |
    </div>
  </footer>
</template>

<script setup>
import SocialLinks from "@/components/SocialLinks.vue";
</script>

<style scoped>
footer {
  padding: 10px 0 20px 0;
  width: 100%;
  background-color: white;
  font-weight: bold;
  font-size: 12px;
  margin-top: 50px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
</style>
