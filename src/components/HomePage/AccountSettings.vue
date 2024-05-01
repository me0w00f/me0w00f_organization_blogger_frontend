<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      
    }
  },
  props: {
    Opened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    
    CloseAccountSettings() {
      this.$emit('close-account-settings')
    }
  }
}
</script>

<template>
  <div class="mask" v-if="Opened">
    <div class="account-settings-panel">
      <h1 class="settings-title">Accout Settings</h1>
      
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
  top: -68px;
  position: absolute;
  width: 100%;
  height: 108vh;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.account-settings-panel {
  width: 500px;
  height: auto;
  background-color: #ffffff;
  animation: FadeIn 0.5s;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 40px;
}

.settings-title {
  font-size: 30px;
  line-height: 60px;
  cursor: default;
  color: var(--text-font-color);
  transition: ease 0.5s;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.settings-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 18px;
  line-height: 40px;
}

.password-change {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-input {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 18px;
  line-height: 40px;
  border: none;
  border-bottom: solid 2px #212121;
  outline: none;
  margin-bottom: 15px;
  transition: ease-out 250ms;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.form-input:focus {
  transition: ease-in-out 250ms;
  border-bottom: solid 2px var(--primary-color);
}
</style>
