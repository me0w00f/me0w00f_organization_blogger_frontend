<script lang="ts">

export default {
  data() {
      return {
        
      }
  },
  components: {
    
  }
}
</script>

<template>
  <div class="about-page-container">
    <h1 class="title-in-about-page">About</h1>
    <img class="logo-bar" src="../../assets/icons/logo-color.png" />
    <p class="about-page-text-font">Cloud service provided by Me0W00f Cloud.</p>
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
  animation: FadeIn 0.8s;
}

.logo-bar {
  margin-top: 100px;
  margin-bottom: 100px;
}

.title-in-about-page {
  font-family: 'Itim Regular';
  font-size: 32px;
  color: var(--text-font-color);
  line-height: 60px;
}

.about-page-text-font {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  color: var(--text-font-color);
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 25px;
}
</style>
