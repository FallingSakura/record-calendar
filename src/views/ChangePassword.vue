<script setup>
import { ref } from 'vue'
import axios from 'axios'
const old = ref('')
const newPassword = ref('')
const repeat = ref('')
const email = ref('')

const changePassword = async () => {
  try {
    if (newPassword.value !== repeat.value) {
      alert('Passwords do not match.')
      newPassword.value = ''
      repeat.value = ''
      return
    }
    const token = localStorage.getItem('token')
    const res = await axios.put('/changepassword', {
      email: email.value,
      oldPassword: old.value,
      newPassword: newPassword.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="changePassword">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="text" v-model="old" placeholder="Old Password" />
      <input type="password" v-model="newPassword" placeholder="New password" />
      <input
        type="password"
        v-model="repeat"
        placeholder="Repeat your new password"
      />
      <button>Submit</button>
    </form>
  </div>
</template>
