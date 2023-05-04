<template>
  <MainMenu></MainMenu>
  <router-view :key="$route.path" />
  <FooterContent></FooterContent>
</template>

<script setup>
import MainMenu from "@/components/MainMenu.vue";
import FooterContent from "@/components/FooterContent.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin: 0px;
}
</style>
