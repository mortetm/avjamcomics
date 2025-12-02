<template>
  <nav>
    <router-link :to="`/${chosenComic}/latest`">
      <div class="main-menu-logo-wrap">
        <div class="main-menu-logo">
          <!-- TourBunny -->
          <img
            v-show="store.chosenComic === 'ttb'"
            class="logo-image"
            src="@/assets/logo-ttb.png"
            alt="The TourBunny Logo"
          />

          <!-- Hairball Chronicles -->
          <img
            v-show="store.chosenComic === 'thbc'"
            class="logo-image"
            src="@/assets/logo-thbc.png"
            alt="The Hairball Chronicles Logo"
          />

          <!-- Dark Lines - Stacked for transition -->
          <div v-show="store.chosenComic === 'dl'" class="logo-stack">
            <img
              class="logo-image logo-base"
              src="@/assets/logo-dlc.png"
              alt="Dark Lines Logo"
            />
            <img
              class="logo-image logo-overlay"
              :class="{ 'show-color': store.isColor }"
              src="@/assets/logo-dlc-color.png"
              alt="Dark Lines Color Logo"
            />
          </div>

          <!-- Default -->
          <img
            v-show="!['ttb', 'thbc', 'dl'].includes(store.chosenComic)"
            class="logo-image"
            src="@/assets/logo.png"
            alt="AvJam Comics Logo"
          />
        </div>
      </div>
    </router-link>
    <div class="main-menu">
      <router-link :to="`/${chosenComic}/latest`">Latest</router-link>
      | <router-link to="/about">About</router-link> |
      <!-- <router-link to="/shop">Shop</router-link> | -->
      <router-link to="/">Other Comics</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";
import { computed } from "vue";

const store = useComicContentStore();
const chosenComic = computed(() => store.chosenComic);
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px 3%;
  width: 100%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.2s ease;
}

nav a.router-link-exact-active {
  color: #d4af37;
}

.main-menu-logo-wrap {
  position: relative;
  width: 100%;
  max-width: 250px;
}

.main-menu-logo {
  width: 100%;
  position: relative;
}

/* All logos */
.logo-image {
  max-width: 250px;
  width: 100%;
  height: auto;
  display: block;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* Dark Lines logo stack */
.logo-stack {
  position: relative;
  width: 100%;
}

.logo-base {
  position: relative;
  display: block;
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  will-change: opacity;
  pointer-events: none;
}

.logo-overlay.show-color {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  nav {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 26px;
  }

  .main-menu-logo-wrap {
    max-width: 200px;
  }
}
</style>
