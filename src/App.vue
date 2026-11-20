<script setup lang="ts">
import { computed } from 'vue';
import { Pages } from "./core/detector.ts";
import { getScreen } from "./screens";

const props = defineProps<{ page: Pages; }>();
const currentScreen = computed(() => getScreen(props.page));
</script>

<template>
  <component :is="currentScreen"/>
</template>