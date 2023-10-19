<script lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
import { AuthenticateStatus } from './stores/authentication_status'
import { storeToRefs } from 'pinia'

export default {
  components: {
    RouterView,
    NavBar
  },
  methods: {
    CheckLoggingStatus() {
      if (localStorage.getItem('token') != null) {
        this.logStatus.setLogStatus(true);
      }
    }
  },
  setup() {
    const logStatus = AuthenticateStatus();
    const SavedLogStatus = storeToRefs(logStatus);

    return {
      SavedLogStatus,
      logStatus
    }
  },
  mounted() {
    this.CheckLoggingStatus();
  }
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
