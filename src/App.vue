<template>
  <router-view :key="$route.path" />
  <FooterContent></FooterContent>
</template>

<script setup>
import FooterContent from "@/components/FooterContent.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";

const comicData = reactive({});

onMounted(async () => {
  const response = await axios({
    url: "https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts?categories=2",
  });
  comicData.items = await response.json();
  console.log(comicData.items);
});
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
</style>
