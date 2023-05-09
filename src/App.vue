<template>
  <div v-if="!store.latestComicPostID">
    <div class="loading">... Loading</div>
  </div>

  <div v-if="store.latestComicPostID">
    <router-view :key="$route.path" />
    <FooterContent></FooterContent>
  </div>
</template>

<script setup>
import FooterContent from "@/components/FooterContent.vue";
import { useComicContentStore } from "./stores/comics";

/* store setup */
const store = useComicContentStore();

/* call the API on mounted hook*/
store.fetchComics();
</script>

<style>
@font-face {
  font-family: "AVJAMFB";
  src: url("./assets/fonts/AVJAMFB.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "AVJAMFR";
  src: url("./assets/fonts/AVJAMFR.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: AVJAMFB, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #324458;
}

h1 {
  margin: 0px;
}

a {
  text-decoration: none;
  color: #324458;
  transition: 0.3s;
}

a:hover {
  color: #d4af37;
  text-decoration: underline;
}

.loading {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}
</style>
