<template>
  <div class="link-boxes">
    <LinkBox
      v-for="box in linkBoxes"
      :key="box.id"
      :image="box.image"
      :title="box.title"
    ></LinkBox>
  </div>
</template>

<script setup>
import LinkBox from "@/components/LinkBox.vue";
import { useLinkBoxContent } from "@/composables/linkBoxContent.js";

const linkBoxes = useLinkBoxContent();
</script>

<style scoped>
.link-boxes {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 3%;
  flex-wrap: wrap;
  display: none;
}
</style>
