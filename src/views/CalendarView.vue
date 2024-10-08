<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Calendar from '../components/Calendar/CalendarCmp.vue'
import ControlPanel from '../components/Calendar/CalendarControlPanel.vue'
import UserPanel from '../components/Calendar/CalendarUserPanel.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const date = ref(new Date())
let dataStore = ref(new Map())
let status = ref(0)

onMounted(() => {
  getUserData()
})

function isTokenExpired(token) {
  const payloadBase64 = token.split('.')[1]
  const payload = JSON.parse(atob(payloadBase64))
  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}
function authorize(token) {
  if (isTokenExpired(token)) {
    authStore.logout()
    alert('Token Expired! You\'re Logout now.')
    return false;
  }
  else return true
}

async function getUserData() {
  try {
    const token = localStorage.getItem('token')
    if (!token || !authorize(token)) return
    const res = await axios.get('/get/data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dataStore.value = new Map(Object.entries(res.data))
  } catch (err) {
    console.error('Failed to get user data', err)
  }
}

async function updateData(key, value) {
  try {
    const token = localStorage.getItem('token')
    if (!token || !authorize(token)) return
    await axios.put(
      '/update-data',
      {
        date: key,
        value: value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (err) {
    console.error(err)
  }
}
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const year = computed(() => date.value.getFullYear())
// 2024
const month = computed(() => date.value.getMonth())
// 08 - 7
class Day {
  constructor(date, isCurrentDay = false, isLastMonth = false) {
    this.date = date
    this.isCurrentDay = isCurrentDay
    this.isLastMonth = isLastMonth
  }
}

const daysInMonth = computed(() => {
  const days = []
  const firstDay = new Date(year.value, month.value, 1).getDay()
  const lastDate = new Date(year.value, month.value + 1, 0).getDate()

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Day(new Date(year.value, month.value, -i), false, true))
  }

  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year.value, month.value, i)
    days.push(new Day(currentDate, isToday(currentDate)))
  }
  return days
})

let half = computed(() => {
  if (
    (year.value % 4 === 0 && year.value % 100 !== 0) ||
    year.value % 400 === 0
  )
    return 182
  else return 181
})

function reset() {
  date.value = new Date()
}
function toggleStatus() {
  status.value = status.value === 0 ? 1 : 0
}
function isToday(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
function getDateKey(dateEl) {
  const day = dateEl instanceof Date ? dateEl : daysInMonth.value[dateEl].date
  return `${day.getFullYear()}${String(day.getMonth() + 1).padStart(
    2,
    '0'
  )}${String(day.getDate()).padStart(2, '0')}`
}

function prevMonth() {
  date.value.setMonth(date.value.getMonth() - 1)
  date.value = new Date(date.value)
}

function nextMonth() {
  date.value.setMonth(date.value.getMonth() + 1)
  date.value = new Date(date.value)
}
function prevYear() {
  date.value.setFullYear(date.value.getFullYear() - 1)
  date.value = new Date(date.value)
}
function nextYear() {
  date.value.setFullYear(date.value.getFullYear() + 1)
  date.value = new Date(date.value)
}
function beyond(dateEl) {
  const today = new Date()
  if (dateEl > today) return false
  return true
}
function addIndex(index, isLastMonth = false) {
  if (!beyond(daysInMonth.value[index].date)) {
    alert('这里的区域，以后再来探索吧！')
    return
  }
  if (isLastMonth) return
  const timeIndex = getDateKey(index)
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === 3) return
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) + 1)
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex)
      updateData(timeIndex, null)
      return
    }
  } else dataStore.value.set(timeIndex, 1)
  updateData(timeIndex, dataStore.value.get(timeIndex))
}
function minusIndex(index, isLastMonth = false) {
  if (!beyond(daysInMonth.value[index].date)) {
    alert('这里的区域，以后再来探索吧！')
    return
  }
  if (isLastMonth) return
  const timeIndex = getDateKey(index)
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === -3) return
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) - 1)
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex)
      updateData(timeIndex, null)
      return
    }
  } else dataStore.value.set(timeIndex, -1)
  updateData(timeIndex, dataStore.value.get(timeIndex))
}
function getBackGroundColor(index) {
  const timeIndex = getDateKey(index)
  if (!dataStore.value.has(timeIndex)) return
  const color = ref('')
  switch (dataStore.value.get(timeIndex)) {
    case 1:
      color.value = '#0bbd92'
      break
    case 2:
      color.value = '#2eb84d'
      break
    case 3:
      color.value = '#3bd115'
      break
    case 0:
      break
    case -1:
      color.value = '#547898'
      break
    case -2:
      color.value = '#34506a'
      break
    case -3:
      color.value = '#122d46'
      break
    default:
      break
  }
  return color.value
}
function getFontColor(index) {
  const timeIndex = getDateKey(index)
  if (
    !dataStore.value.has(timeIndex) ||
    dataStore.value.get(timeIndex) === null
  )
    return
  return '#fff'
}
</script>

<template>
  <div class="body">
    <div class="container">
      <!-- <UserPanel /> -->
      <ControlPanel
        :reset="reset"
        :status="status"
        :toggleStatus="toggleStatus"
      />
    </div>
    <Calendar
      :monthNames="monthNames"
      :month="month"
      :year="year"
      :prevMonth="prevMonth"
      :nextMonth="nextMonth"
      :prevYear="prevYear"
      :nextYear="nextYear"
      :weekDays="weekDays"
      :daysInMonth="daysInMonth"
      :addIndex="addIndex"
      :minusIndex="minusIndex"
      :getBackgroundColor="getBackGroundColor"
      :getFontColor="getFontColor"
      :getDateKey="getDateKey"
      :dataStore="dataStore"
      :status="status"
      :half="half"
    />
  </div>
</template>
<style scoped>
.body {
  background-color: #6d8696;
  background-image: linear-gradient(135deg, #71bdbc, #6d8696);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1100px) {
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
