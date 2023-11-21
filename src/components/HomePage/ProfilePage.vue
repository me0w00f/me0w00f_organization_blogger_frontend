<script lang="ts">
type ProfileInfo = {
  user_name: String,
  nick_name: String,
  user_uuid: String,
  avatar: string,
  
}

export default {
  data() {
    return {}
  },
  props: {
    Opened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ClosePage() {
      this.$emit('close-profile-page')
    }
  }
}
</script>
<template>
  <div class="profile-container" v-if="Opened">
    <h1 class="post-title">Profile</h1>
    <button class="buttons" @click="ClosePage">close</button>
  </div>
</template>
<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  color: var(--text-font-color);
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}
.profile-container {
  width: 55vw;
  height: 90vh;
  animation: FadeIn 0.5s;
}

.post-title {
  font-size: 50px;
  line-height: 100px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}
</style>
