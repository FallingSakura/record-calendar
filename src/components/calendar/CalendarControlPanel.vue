<script setup>
import ControlButton from '@/components/control/CalendarControlButton.vue'
import { useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()
onMounted(() => {
  authStore.initialize()
})
const router = useRouter()
const props = defineProps(['reset', 'status', 'toggleStatus'])
const buttons = [
  {
    icon: 'fa-solid fa-location-crosshairs',
    fn: props.reset,
    name: 'Today',
    hover: ref(false)
  },
  {
    icon: computed(() => {
      return props.status === 0
        ? 'fa-solid fa-toggle-off'
        : 'fa-solid fa-toggle-on'
    }),
    fn: props.toggleStatus,
    name: 'HeatMap',
    hover: ref(false)
  },
  {
    icon: computed(() =>
      authStore.isAuthenticated
        ? 'fa-solid fa-right-from-bracket'
        : 'fa-solid fa-user'
    ),
    fn: loginout,
    name: computed(() => (authStore.isAuthenticated ? 'Logout' : 'Login')),
    hover: ref(false)
  },
  {
    icon: 'fa-solid fa-sun',
    fn: () => {},
    name: 'Theme',
    hover: ref(false)
  },
  {
    icon: 'fa-solid fa-gear',
    fn: () => {},
    name: 'Settings',
    hover: ref(false)
  },
  {
    icon: 'fa-brands fa-github',
    fn: () => {
      window.open('https://github.com/FallingSakura/record-calendar')
    },
    name: 'Github',
    hover: ref(false)
  }
]

function loginout() {
  if (authStore.isAuthenticated) {
    try {
      authStore.logout()
      router.replace({
        path: '/login'
      })
      toast.success('Logout Successfully!')
      return
    } catch (err) {
      console.error('Logout Error:', err)
      toast.error('Logout Error!')
    }
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
  /* width: 500px; */
  height: 70px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 15px;
}

.control-button:not(:last-child) {
  margin-right: 16px;
}

.control-button i {
  transition: all 1s ease;
}

@media (max-width: 1024px) {
  .control {
    width: 300px;
  }
}
@media (max-width: 600px) {
  .control {
    transform: scale(0.9);
  }
}
</style>
