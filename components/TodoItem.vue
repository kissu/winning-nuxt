<script setup>
const props = defineProps({
  todo: Object
});
</script>

<template>
  <li class="text-sm font-bold text-teal-500 underline">{{ todo.text }}</li>
</template>
