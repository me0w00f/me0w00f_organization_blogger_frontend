<script lang="ts">
export default {
  data() {
    return {}
  },
  props: {
    Opened: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    ClosePage() {
      this.$emit('close-upload-page')
    }
  }
}
</script>
<template>
  <div class="upload-panel-container" v-if="Opened">
    <h1 class="post-title">Send Your Post</h1>
    <div class="from-box">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
    <button @click="ClosePage">Close</button>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  color: var(--text-font-color);
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
}
.upload-panel-container {
  width: 55vw;
  height: 90vh;
  /* background-color: #ffffff; */
  animation: FadeIn 0.5s;
  /* display: flex; */
}

.post-title {
  font-size: 50px;
  line-height: 100px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  transition: ease 0.5s;
}

.from-box {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
