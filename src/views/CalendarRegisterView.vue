<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios'
const EMAIL = 'Email'
const NAME = 'Name'
const PASSWORD = 'Password'
const REPEAT = 'Repeat Your Password'
const email = ref('')
const password = ref('')
const name = ref('')
const repeat = ref('')

const register = async () => {
  try {
    if (password.value !== repeat.value) {
      alert('Password do not match')
      password.value = ''
      repeat.value = ''
      return
    }
    const response = await axios.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <div class="body">
    <div class="container">
      <h1>Register</h1>
      <form @submit.prevent="register" class="form">
        <div class="form-control">
          <input id="name" type="text" :readonly="isReadonly" @focus="isReadonly = false" v-model="name" required />
          <label for="name">
            <span
              v-for="(letter, index) in NAME"
              :key="index"
              :style="{ '--i': index }"
              >{{ letter }}</span
            >
          </label>
        </div>
        <div class="form-control">
          <input id="email" type="text" :readonly="isReadonly" @focus="isReadonly = false" v-model="email" required />
          <label for="email">
            <span
              v-for="(letter, index) in EMAIL"
              :key="index"
              :style="{ '--i': index }"
              >{{ letter }}</span
            >
          </label>
        </div>
        <div class="form-control">
          <input id="password" type="password" :readonly="isReadonly" @focus="isReadonly = false" v-model="password" required />
          <label for="password">
            <span
              v-for="(letter, index) in PASSWORD"
              :key="index"
              :style="{ '--i': index }"
              >{{ letter }}</span
            >
          </label>
        </div>
        <div class="form-control">
          <input id="repeat" type="password" :readonly="isReadonly" @focus="isReadonly = false" v-model="repeat" required />
          <label for="repeat">
            <span
              v-for="(letter, index) in REPEAT"
              :key="index"
              :style="{ '--i': index * 0.2 }"
              >{{ letter }}</span
            >
          </label>
        </div>
        <button type="submit" class="btn">Register</button>
        <p class="text">
          Already have an account?
          <router-link to="/login">Back to login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap');
.body {
  background-image: linear-gradient(135deg, #71bdbc, #6d8696);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SUSE';
}
.container {
  width: 400px;
  height: 530px;
  background-color: #ffffff24;
  backdrop-filter: blur(50px);
  border-radius: 15px;
  border: 1px solid #8dc9cd8d;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container h1 {
  text-align: center;
  letter-spacing: 5px;
  font-size: 2rem;
  font-weight: 800;
  background-image: linear-gradient(90deg, #a5c2f7, #aeede8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}

.container a {
  text-decoration: none;
  color: #ace4f7;
}
.container a:hover {
  color: #86e1ff;
}
.btn {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  width: 100%;
  background: #2980b9;
  margin-top: 40px;
  padding: 15px;
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.821);
  border: 0;
  border-radius: 10px;
  font-size: 1.4rem;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}
.btn:hover {
  filter: brightness(1.1);
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text {
  font-size: 1rem;
  margin: 30px 0 0;
}

.form-control {
  position: relative;
  margin-top: 15px;
  width: 250px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0 5px;
  border-radius: 2px;
  font-size: 18px;
  color: white;
  position: relative;
  z-index: 100;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: #afe7eb;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0px;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  letter-spacing: 1px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: calc(var(--i) * 50ms);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: #afe7eb;
  transform: translateY(-25px);
}
</style>
