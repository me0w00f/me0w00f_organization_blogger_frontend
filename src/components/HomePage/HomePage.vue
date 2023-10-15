<script lang="ts">
export default {
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<template>
  <div class="home-page-container">
    <div class="account-info">
      <div class="avatar">
        <img class="avatar-img" src="https://weepingdogel.github.io/photo_2021-07-21_03-31-50.jpg" />
      </div>
      <p class="user-name-text"> WeepingDogel </p>
      <p class="bio-text">I'm afraid once something is truly lost, which can never come back again.</p>
    </div>
    <div class="">

    </div>
  </div>
</template>

<style scoped>
.home-page-contaner {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}

.account-info {
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.8s;
}

.avatar {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: #f3f3f3;
}

.user-name-text {
  font-family: 'Mooli-Regular';
  font-size: 25px;
  text-align: center;
  line-height: 50px;
}

.bio-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-size: 18px;
  text-align: center;
  line-height: 25px;
  padding: 5px;
}
</style>
