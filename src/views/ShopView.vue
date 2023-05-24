<template>
  <div class="page">
    <MainMenu :lastComic="store.latestComicPostID"></MainMenu>
    <div v-if="!store.latestComicPostID">
      <div class="loading">... Loading</div>
    </div>
    <div class="about">
      <h1>This is a store page</h1>
    </div>
  </div>
</template>

<script setup>
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();
</script>
