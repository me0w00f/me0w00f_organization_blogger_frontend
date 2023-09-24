<script lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'

export default {
  components: {
    RouterView,
    NavBar
  }
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
