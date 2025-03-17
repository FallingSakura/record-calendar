<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const avatar = ref('/favicon.ico')
const username = ref('Anonymous')
const isLoading = ref(false)
const error = ref(null)
onMounted(async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const [avatarRes, userRes] = await Promise.all([
      axios.get('/get/avatar', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get('/get/username', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ])
    avatar.value = avatarRes.data.avatar
    username.value = userRes.data.username
  } catch (err) {
    console.error('Failed to get user data', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <transition mode="out-in" name="blur">
    <div class="user-container">
      <img class="avatar" :src="avatar" alt="avatar" />
      <h3 class="username">{{ username }}</h3>
    </div>
  </transition>
</template>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
  border: 1px solid #fafafac0;
  margin: 0;
}
.username {
  text-align: center;
  color: #222;
  font-family: 'PT sans';
  font-weight: normal;
  margin-right: 20px;
}
.user-container {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  padding: 8px;
}
</style>
