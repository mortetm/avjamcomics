<template>
  <div class="page">
    <MainMenu :lastComic="store.latestComicPostID"></MainMenu>
    <div v-if="!store.latestComicPostID">
      <div class="loading">... Loading</div>
    </div>
    <div class="about" v-if="store.latestComicPostID">
      <h1>About AVJAMComics</h1>
      <h2>Antonio & Viktória</h2>
      <span
        >We are a couple from Croatia/Hungary who spent almost five years living
        in Iceland and working in tourism. After a few long years of enduring
        the craziest customers, we started drawing these comics as a way to blow
        off steam. It quickly became a hit among our friends and coworkers, and
        soon we had a few books and a few hundred comics under our belt!
      </span>
      <h2>Moving from Iceland</h2>
      <span
        >After many wonderful years working in Iceland, we moved to remotely
        work from Croatia, but sadly, COVID came and completely shut down
        tourism. For a while we were drawing one comic a day, with addition of
        two new comics: The Hairball Chronicles (about our cats), and Dark Lines
        (about everything and anything). We tried to keep the comics going, but
        after a while, lack of energy and life obligations (including new
        careers) forced us to stop drawing.</span
      >
      <h2>Are we back?</h2>
      <span
        >No, not yet. But with a new website and a renewed enthusiasm, we
        remastered all of our content. Our comics have all been redrawn and
        refreshed, so we are ready to share them once again. And maybe we
        actually start drawing again soon ;)</span
      >
      <h2>Contact</h2>
      <span
        >We love talking to you guys. If you ever want to shoot us an email,
        please do so at <strong>avjamcomics@gmail.com</strong> and we will do
        our best to respond asap!</span
      >
    </div>
  </div>
</template>

<script setup>
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}
.about {
  max-width: 640px;
  margin: 0 auto;
  text-align: left;
}
span {
  text-align: left;
}
</style>
