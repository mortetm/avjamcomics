<template>
  <div>
    <router-link
      :class="{ disabled: isFirst }"
      :to="`/${chosenComic}/comic/0001`"
      >&lt;&lt; First</router-link
    >
    <router-link
      :class="{ disabled: isFirst }"
      :to="`/${chosenComic}/comic/${props.prev}`"
      >&lt; {{ !isFirst ? props.prev : "Prev" }}</router-link
    >
    <router-link
      :class="{ disabled: isLast }"
      :to="`/${chosenComic}/comic/${props.next}`"
      >{{ !isLast ? props.next : "Next" }} &gt;</router-link
    >
    <router-link :class="{ disabled: isLast }" :to="`/${chosenComic}/latest`"
      >Last &gt;&gt;</router-link
    >
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const chosenComic = route.params.comic;

const props = defineProps(["prev", "next", "isLast", "isFirst", "lastComic"]);
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  margin: 0 auto;
  font-size: 28px;
}

div a {
  text-decoration: none;
  color: inherit;
}

.disabled {
  color: rgb(193, 193, 193);
  pointer-events: none;
}
</style>
