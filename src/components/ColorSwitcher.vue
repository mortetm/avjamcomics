<template>
  <div>
    <input
      id="trigger"
      type="checkbox"
      :checked="store.isColor"
      @click="switchColor"
    />
    <label for="trigger" class="checker"></label>
  </div>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";
import { useFavicon } from "@vueuse/core";
import { watch, onMounted, onUnmounted } from "vue";

const icon = useFavicon();
const store = useComicContentStore();

function switchColor() {
  const newColorState = !store.isColor;

  // Update store (this will trigger the CSS transition in images)
  store.saveColorPreference(newColorState);

  // Update theme without causing reflow
  requestAnimationFrame(() => {
    updateTheme(newColorState);
  });
}

function updateTheme(isColor) {
  // Update favicon
  icon.value = isColor
    ? `/favicon-${store.chosenComic}-c.png`
    : `/favicon-${store.chosenComic}.png`;

  // Update background color
  const backgroundColor =
    isColor && store.comicColor
      ? `color-mix(in srgb, ${store.comicColor} 40%, #ffffff)`
      : "#ffffff";

  document.body.style.backgroundColor = backgroundColor;
}

onMounted(() => {
  document.body.style.transition = "background-color 0.6s ease-in-out";
  updateTheme(store.isColor);
});

onUnmounted(() => {
  document.body.style.transition = "";
  document.body.style.backgroundColor = "";
});

watch(
  () => store.chosenComic,
  () => {
    updateTheme(store.isColor);
  }
);

watch(
  () => store.comicColor,
  () => {
    if (store.isColor) {
      updateTheme(true);
    }
  }
);
</script>

<style scoped>
#trigger {
  display: none;
}
.checker {
  background-image: url("../assets/color-switch-v9.png");
  background-position: right center;
  background-size: auto 100%;
  width: 120px;
  height: 20px;
  background-repeat: no-repeat;
  display: block;
}
#trigger:checked + .checker {
  background-position: left center;
}
</style>
