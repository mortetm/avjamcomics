<template>
  <MainMenu :lastComic="store.latestComicPostID"></MainMenu>
  <div v-if="!store.latestComicPostID">
    <div class="loading">... Loading</div>
  </div>
  <div class="about" v-if="store.latestComicPostID">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();
</script>
