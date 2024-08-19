<script setup>
import { getVersion } from '../api'
import { onMounted, ref } from "vue";

const apiVersion = ref('')

onMounted(async () => {
  apiVersion.value = await getVersion() || ''
})
</script>

<template>
  <header class="header">
    <router-link class="logo" :to="{ name: 'Schedule' }"><img src="../../public/images/logo.svg" alt="Logo"></router-link>
    <div class="nav" id="nav">
      <div class="nav-item">
        <img class="nav-icon" src="../../public/images/schedule.png" alt="Schedule Icon">
        <router-link class="link" :to="{ name: 'Schedule' }">Schedule</router-link>
      </div>
      <div class="nav-item">
        <img class="nav-icon" src="../../public/images/leaderboard.png" alt="Leaderboard Icon">
        <router-link class="link" :to="{ name: 'Leaderboard' }">Leaderboard</router-link>
      </div>
    </div>
  </header>

  <div class="content">
    <slot>DEFAULT CONTENT</slot>
  </div>

  <footer class="footer">API Version {{ apiVersion }}</footer>
</template>

<style scoped>
.header {
  height: 60px;
  padding: 0 40px;
  background-color: #025FEB;
  display: flex;
  justify-content: space-between;
  color: #FFFFFF;
  font-size: 16px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
}

.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
}

.nav-item {
  align-items: center;
  display: flex;
}

.nav-icon {
  width: 25px;
  height: 25px;
  margin-right: 6px;
}

.link {
  color: #FFFFFF;
  text-decoration: none;
}

.content {
  margin: 60px auto;
  width: 90%;
  height: 100%;
}

.footer {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #4B5C68;
  background-color: #F6F7F7;
  padding: 0 40px;
  font-weight: bold;
}
</style>