<script setup>
const props = defineProps(['icon', 'name', 'isHover'])
</script>
<template>
  <div class="button">
    <i :class="props.icon"></i>
    <transition mode="out-in" name="fade">
    <span class="description" v-show="props.isHover">{{ props.name }}</span>
    </transition>
  </div>
</template>

<style scoped>
.button {
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 1.3rem;
  cursor: pointer;
}
.description {
  font-size: 0.6em;
  position: absolute;
  bottom: -38px;
  color: #333333c3;
  background-color: #ffffff8d;
  padding: 5px;
  border-radius: 8px;
}
</style>
