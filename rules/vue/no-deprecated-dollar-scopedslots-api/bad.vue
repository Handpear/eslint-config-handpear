<script>
  export default {
    render() {
      return this.$scopedSlots.default();
    },
  };
</script>
<template>
  <div v-if="$scopedSlots.default"><slot /></div>
</template>
