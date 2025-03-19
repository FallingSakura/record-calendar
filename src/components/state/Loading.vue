<script setup>
import { defineProps } from 'vue'

const props = defineProps(['isLoading'])
</script>
<template>
  <transition mode="out-in" name="fade">
    <div class="loading" v-show="isLoading">
      <div class="loading-box">
        <i class="fa-solid fa-spinner"></i>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #0000008c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 10;
}
.loading-box {
  width: 200px;
  height: 200px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading-box i {
  font-size: 4rem;
  color: #6d8696;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
