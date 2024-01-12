<script lang="ts">
import { RouterLink } from 'vue-router'
import { AuthenticateStatus } from '@/stores/authentication_status'
import { storeToRefs } from 'pinia'

export default {
  data() {
    return {
      isNotLogged: true
    }
  },
  methods: {
    CheckLoggingStatus() {
      if (this.logStatus.isLogged) {
        console.log(this.logStatus.isLogged)
        this.isNotLogged = false
      } else {
        this.isNotLogged = true
      }
    },
    logout() {
      localStorage.removeItem('token')
      AuthenticateStatus().setLogStatus(false)
      this.$router.push('/')
      console.log(this.logStatus.isLogged)
    }
  },
  components: {
    RouterLink
  },
  mounted() {
    this.CheckLoggingStatus()
  },
  setup() {
    const logStatus = AuthenticateStatus()
    const UpdateLogStatus = storeToRefs(logStatus)

    return {
      UpdateLogStatus,
      logStatus
    }
  },
  watch: {
    'logStatus.isLogged'(newValue, oldValue) {
      this.CheckLoggingStatus()
    }
  }
}
</script>

<template>
  <div class="main-bar-in-navbar">
    <p class="main-title-in-navbar">Me0W00f Technology Blog</p>
    <div class="link-container-in-navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login" v-if="isNotLogged">Login</RouterLink>
      <button id="LogOut" @click="logout" v-else>Logout</button>
      <!-- <RouterLink to="/posts">Articles</RouterLink> -->
      <RouterLink to="/about">About</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.main-bar-in-navbar {
  background-color: var(--primary-color);
  width: 100%;
  height: 78px;
  /* box-shadow: 0px 1.5px 5px var(--bottom-border-color); */
  /* border-bottom: solid 4px var(--bottom-border-color); */
  display: flex;
  flex-direction: row;
}

.main-title-in-navbar {
  font-family: 'Itim Regular', system-ui, sans;
  font-size: 28px;
  color: #ffffff;
  line-height: 78px;
  padding-left: 20px;
  /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); black shadow with 2px offset and 4px blur */
}

.link-container-in-navbar {
  height: 78px;
  margin-left: auto;
  margin-right: 20px;
}
.link-container-in-navbar a {
  font-family: 'Itim Regular', system-ui, sans;
  font-size: 25px;
  color: #ffffff;
  margin-left: 40px;
  line-height: 78px;
  text-decoration: none;
  /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); */
}

.router-link-exact-active {
  font-weight: bolder;
}

#LogOut {
  font-family: 'Itim Regular', system-ui, sans;
  font-size: 25px;
  color: #ffffff;
  margin-right: auto;
  margin-left: 40px;
  height: 78px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: var(--primary-color);
  /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); */
}

@media only screen and (max-width: 768px) {
  .main-bar-in-navbar {
    background-color: var(--primary-color);
    width: 100%;
    height: 60px;
    /* box-shadow: 0px 1.5px 5px var(--bottom-border-color); */
    /* border-bottom: solid 4px var(--bottom-border-color); */
    display: flex;
    flex-direction: row;
  }

  .main-title-in-navbar {
    font-family: 'Itim Regular', system-ui, sans;
    font-size: 16px;
    color: #ffffff;
    line-height: 60px;
    padding-left: 20px;
    /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); black shadow with 2px offset and 4px blur */
  }

  .link-container-in-navbar {
    height: 78px;
    /* margin-left: auto; */
    margin-right: 20px;
    display: none;
  }

  .router-link-exact-active {
    font-weight: bolder;
  }

  #LogOut {
    font-family: 'Itim Regular', system-ui, sans;
    font-size: 18px;
    color: #ffffff;
    /* margin-right: auto; */
    /* margin-left: 40px; */
    height: 78px;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: var(--primary-color);
    /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); */
  }
}
</style>
