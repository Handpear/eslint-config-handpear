<script>
  export default {
    methods: {
      onClick() {
        this.$emit("my-event");
      },
    },
  };
</script>
<template>
  <button @click="$emit('my-event')" />
</template>
