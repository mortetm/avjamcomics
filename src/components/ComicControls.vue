<template>
  <div>
    <router-link :class="{ disabled: isFirst }" :to="`/comic/001`"
      >&lt;&lt;</router-link
    >
    <router-link :class="{ disabled: isFirst }" :to="`/comic/${props.prev}`"
      >&lt;</router-link
    >
    <router-link :class="{ disabled: isLast }" :to="`/comic/${props.next}`"
      >&gt;</router-link
    >
    <router-link :class="{ disabled: isLast }" :to="`/`">&gt;&gt;</router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["prev", "next", "isLast", "isFirst"]);
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  margin: 0 auto;
}
span {
  font-size: 2rem;
}

.disabled {
  color: rgb(193, 193, 193);
  pointer-events: none;
}
</style>
