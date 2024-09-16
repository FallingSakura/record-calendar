<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <transition name="change" mode="out-in">
    <RouterView />
  </transition>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  display: none;
}
.blur-enter-to,
.blur-leave-from {
  filter: blur(0px);
}
.blur-enter-active,
.blur-leave-active {
  transition: filter 0.2s ease;
}
.blur-enter-from,
.blur-leave-to {
  filter: blur(30px);
}

.change-enter-to,
.change-leave-from {
  filter: blur(0px);
}
.change-enter-active,
.blur-leave-active {
  transition: filter 0.5s ease;
}
.change-enter-from,
.change-leave-to {
  filter: blur(50px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
