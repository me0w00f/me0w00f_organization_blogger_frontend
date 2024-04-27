<script lang="ts">
export default {
  data() {
    return {}
  },
  methods: {
    CloseSettingsPanel() {
      this.$emit('close-settings-pannel')
    }
  },
  props: {
    Opened: {
      type: Boolean,
      required: true
    }
  },
  mounted() {}
}
</script>

<template>
  <div class="mask" v-if="Opened">
    <div class="settings-pannel">
      <h1 class="settings-title">Settings</h1>
      <div class="settings-container">
        <div class="settings-menu">
          <button class="settings-button-active">General</button>
          <button class="settings-button">Account Settings</button>
          <button class="settings-button">Management</button>
        </div>
        <div class="settings-page">
          <button class="buttons" @click="CloseSettingsPanel">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 450;
  color: var(--text-font-color);
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.mask {
  width: 100%;
  height: 110vh;
  top: -68px;
  position: absolute;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-pannel {
  width: 800px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  animation: FadeIn 0.5s;
  display: flex;
  flex-direction: column;
}

.settings-container {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.settings-menu {
  width: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.settings-title {
  font-size: 30px;
  line-height: 60px;
  cursor: default;
  color: var(--text-font-color);
  transition: ease 0.5s;
  padding-left: 30px;
  padding-top: 10px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.settings-page {
  width: 80%;
  padding: 10px;
}
.settings-button {
  padding: 10px 28px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  color: var(--text-font-color);
  background-color: #ffffff;
  border-radius: 10px;
  text-align: left;
}

.settings-button:hover {
  transition: ease-out 200ms;
  filter: brightness(0.95);
}

.settings-button:active {
  transition: ease-out 200ms;
  transform: scale(0.975);
  filter: brightness(0.775);
}
.settings-button-active {
  cursor: pointer;
  background-color: var(--primary-color);
  padding: 10px 28px;
  border: none;
  font-size: 16px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  border-radius: 10px;
  color: #ffffff;
  text-align: left;
}
</style>
