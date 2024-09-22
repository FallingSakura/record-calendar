<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  axios.get('/get-data', )
})

</script>
<template>
  <div class="container">
    <img class="avatar" src="https://cdn.jsdelivr.net/gh/FallingSakura/Source@main/img/202305211656851.webp" alt="avatar">
    <h3 class="username"></h3>
  </div>
</template>