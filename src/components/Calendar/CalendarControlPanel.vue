<script setup>
import ControlButton from './CalendarControlButton.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
authStore.initialize()
const router = useRouter()
const props = defineProps(['reset', 'status', 'toggleStatus'])
const buttons = {
  0: {
    icon: 'fa-solid fa-location-crosshairs',
    fn: props.reset,
    name: 'Locate',
    hover: ref(false)
  },
  1: {
    icon: computed(() => {
      return props.status === 0
        ? 'fa-solid fa-toggle-off'
        : 'fa-solid fa-toggle-on'
    }),
    fn: props.toggleStatus,
    name: 'HeatMap',
    hover: ref(false)
  },
  2: {
    icon: computed(() =>
      authStore.isAuthenticated
        ? 'fa-solid fa-right-from-bracket'
        : 'fa-solid fa-user'
    ),
    fn: loginout,
    name: computed(() => (authStore.isAuthenticated ? 'Logout' : 'Login')),
    hover: ref(false)
  }
}
function loginout() {
  if (authStore.isAuthenticated) {
    authStore.logout()
    router.replace('/')
    router.go(0)
    return
  }
  router.push('/login')
}
</script>
<template>
  <div class="control">
    <ControlButton
      class="control-button"
      v-for="(button, index) in buttons"
      :key="index"
      :icon="typeof button.icon === `string` ? button.icon : button.icon.value"
      :name="button.name"
      @click="button.fn"
      @mouseover="
        () => {
          button.hover.value = true
        }
      "
      @mouseleave="
        () => {
          button.hover.value = false
        }
      "
      :isHover="button.hover.value"
    />
  </div>
</template>
<style scoped>
.control {
  width: 500px;
  height: 70px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 18px;
  margin-top: 5vh;
  margin-bottom: 30px;
}

.control-button {
  margin-right: 16px;
}

.control-button i {
  transition: all 1s ease;
}
</style>
