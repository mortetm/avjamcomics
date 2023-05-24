<template>
  <div class="loading" v-if="!store.latestComicPostID">
    <div>
      <img class="loading-img" src="../src/assets/homepage/loading.gif" />
    </div>
    <div class="loading-text">Loading ...</div>
  </div>

  <div v-if="store.latestComicPostID" class="main-view">
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
*,
*::before,
*::after {
  box-sizing: border-box;
}

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.main-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 97vh;
}

.loading-img {
  max-width: 140px;
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.page {
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
}
</style>
