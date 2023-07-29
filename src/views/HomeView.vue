<template>
  <!-- <h1 class="border">ÁVJAM Comics</h1> -->
  <nav>
    <div class="img">
      <router-link to="/ttb/latest" class="nav-top" href="#">
        <img class="original_img" src="../assets/homepage/top.png" />
        <img class="hover_img" src="../assets/homepage/top-hov.png" />
      </router-link>
    </div>
    <div class="img">
      <router-link to="/thbc/latest" class="nav-mid" href="#">
        <img class="original_img" src="../assets/homepage/middle.png" />
        <img class="hover_img" src="../assets/homepage/middle-hov.png" />
      </router-link>
    </div>
    <div class="img">
      <router-link to="/dl/latest" class="nav-bot" href="#">
        <img class="original_img" src="../assets/homepage/bottom.png" />
        <img class="hover_img" src="../assets/homepage/bottom-hov.png" />
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useHead } from "unhead";
import { useComicContentStore } from "@/stores/comics";
import { useFavicon } from "@vueuse/core";

const store = useComicContentStore();

useHead({
  title: `AVJAM Comics`,
  meta: [
    {
      property: "og:title",
      content: `AVJAM Comics`,
    },
    {
      property: "og:image",
      content: store.images.ogshare,
    },
  ],
});

/* favicon */
// set favicon depending on current comic family
const icon = useFavicon();
icon.value = `favicon.png`;

onMounted(() => {
  document.body.style.backgroundColor = "#ffffff";
});
</script>

<style scoped>
h1 {
  margin-top: 100px;
  width: fit-content;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
}
nav {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  gap: 0;
  margin-bottom: 100px;
}

a {
  position: relative;
}

img {
  position: relative;
  max-width: 100%;
  margin-bottom: -4px;
}

.img {
  display: flex;
}

.hover_img {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.img:hover .hover_img {
  display: inline;
}

.border-thick {
  border: 20px solid black;
  border-image: url(../assets/borders/boxwidethicc.png) 20;
  border-image-repeat: repeat;
}

.border {
  border: 20px solid black;
  border-image: url(../assets/borders/boxwide.png) 20;
  border-image-repeat: repeat;
}
</style>
