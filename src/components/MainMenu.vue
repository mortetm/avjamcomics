<template>
  <nav>
    <router-link :to="`/${chosenComic}/latest`">
      <div class="main-menu-logo">
        <img v-if="store.chosenComic === 'ttb'" src="@/assets/logo-ttb.png" />
        <img
          v-else-if="store.chosenComic === 'thbc'"
          src="@/assets/logo-thbc.png"
        />
        <img
          v-else-if="store.chosenComic === 'dlc' && !store.isColor"
          src="@/assets/logo-dlc.png"
        />
        <img
          v-else-if="store.chosenComic === 'dlc' && store.isColor"
          src="@/assets/logo-dlc-color.png"
        />
        <img v-else src="@/assets/logo.png" />
      </div>
    </router-link>
    <div class="main-menu">
      <router-link :to="`/${chosenComic}/latest`">Latest</router-link>
      | <router-link to="/about">About</router-link> |
      <router-link to="/shop">Shop</router-link> |
      <router-link to="/">Other Comics</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();
const chosenComic = store.chosenComic;

// route on before routing check if latestComic = target comic, if yes,
// transfer the user to /comicID/LATEST instead of /000X
</script>

<style scoped>
img {
  max-width: 250px;
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
