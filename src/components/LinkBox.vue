<template>
  <div class="link-box">
    <img :src="`${props.image}`" />
    <h3>{{ props.title }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["image", "title"]);
console.log(props);
</script>

<style scoped>
.link-box {
  border: 2px solid black;
  padding: 12px 0 5px 0;
  width: 20%;
}

h3 {
  padding: 0 3px;
}

img {
  max-width: 100%;
}
</style>
