<script lang="ts">
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  }
}
</script>

<template>
  <div class="main-bar-in-navbar">
    <p class="main-title-in-navbar">Me0W00f Technology Blog</p>
    <div class="link-container-in-navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/posts">Articles</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.main-bar-in-navbar {
  background-color: var(--primary-color);
  width: 100%;
  height: 78px;
  box-shadow: 0px 1.5px 5px var(--bottom-border-color);
  /* border-bottom: solid 4px var(--bottom-border-color); */
  display: flex;
  flex-direction: row;
}

.main-title-in-navbar {
  font-family: 'Itim Regular';
  font-size: 28px;
  color: #ffffff;
  line-height: 78px;
  padding-left: 20px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); /* black shadow with 2px offset and 4px blur */
}



.link-container-in-navbar {
    height: 78px;
    margin-left: auto;
    margin-right: 20px
}
.link-container-in-navbar a {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #ffffff;
  margin-left: 25px;
  line-height: 78px;
  text-decoration: none;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.router-link-exact-active {
  font-weight: bolder;
}
</style>
