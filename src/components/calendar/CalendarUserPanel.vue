<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const avatar = ref('')
const username = ref('')
const isLoading = ref(false)
const error = ref(null)
async function getData(token) {
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
  return [avatarRes.data.avatar, userRes.data.username]
}
onMounted(async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    if (!token) {
      avatar.value = '/favicon.ico'
      username.value = 'Anonymous'
      return
    }
    avatar.value = localStorage.getItem('avatar') || '/favicon.ico'
    username.value = localStorage.getItem('username') || 'Anonymous'
    if (avatar.value === '/favicon.ico' || username.value === 'Anonymous') {
      const [avatarRes, userRes] = await getData(token)
      avatar.value = avatarRes
      username.value = userRes
      localStorage.setItem('avatar', avatarRes)
      localStorage.setItem('username', userRes)
    }
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
      <div class="info">
        <h3 class="username">{{ username }}</h3>
        <span class="month-day">{{
          `${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${new Date()
            .getDate()
            .toString()
            .padStart(2, '0')}`
        }}</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.user-container {
  display: flex;
  align-items: center;
  height: 70px;
  gap: 10px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  padding: 5px 10px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin: 20px auto;
  display: block;
  border: 1px solid #ffffffc0;
  margin: 0;
}
.username {
  text-align: center;
  color: #222222;
  font-family: 'Poppins';
  font-weight: normal;
  font-size: 1.1rem;
}
.month-day {
  font-family: 'PT Sans';
  font-size: 0.8rem;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  margin-right: 15px;
}
@media (max-width: 600px) {
  .user-container {
    transform: scale(0.9);
  }
}
</style>
