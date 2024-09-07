<script setup>
const props = defineProps(['icon'])
</script>
<template>
  <div class="button">
    <i :class="props.icon"></i>
  </div>
</template>

<style scoped>
.button {
  width: 50px;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
