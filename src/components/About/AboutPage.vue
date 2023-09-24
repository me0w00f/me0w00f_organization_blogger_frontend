<script lang="ts">
export default {
  components: {}
}
</script>

<template>
  <div class="about-page-container">
    <img class="logo-bar" src="../../assets/icons/logo-no-background.png" />
    <h1 class="title-in-about-page">About Us</h1>
  </div>
</template>

<style scoped>
.about-page-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: FadeIn 1s;
}

.logo-bar {
  margin-top: 100px;
  margin-bottom: 100px;
}

.title-in-about-page {
  font-family: 'Itim Regular';
  font-size: 32px;
  color: var(--text-font-color);
}
</style>
