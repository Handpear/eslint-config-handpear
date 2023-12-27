<script>
  export default {
    emits: ["good"],
  };
</script>
<template>
  <div @click="$emit('bad')" />
</template>
