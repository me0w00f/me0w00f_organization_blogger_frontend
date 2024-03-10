<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      new_password: '' as string,
      verify_password: '' as string,
      message: '' as string
    }
  },
  props: {
    Opened: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async ChangePassword() {
      // Method to change password.
      if (this.new_password != this.verify_password) {
        this.message = 'Inconsistency between two password entries.'
      } else if (this.new_password == '' && this.verify_password == '') {
        this.message = 'Password cannot be empty!'
      } else {
        
        try {
          const token = localStorage.getItem('token')          
          const config = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }

          const data = {
            new_password: this.new_password,
            verify_new_password: this.verify_password
          }
          
          const response = await axios.post('/api/user/password/modify', data, config)            
          if (response.data.Status == 'Success!') {
            this.message = response.data.Status =
              'Success! Please use your new password in next login.'
          }
        } catch (error) {
          alert(error)
        }
      }
    },
    CloseAccountSettings() {
      this.$emit('close-account-settings')
    }
  }
}
</script>

<template>
  <div class="mask">
    <div class="account-settings-panel">
      <h1 class="settings-title">Accout Settings</h1>
      <div class="password-change">
        <p class="settings-text">Change Password</p>
        <input
          class="form-input"
          type="password"
          v-model="new_password"
          placeholder="New Password."
        />
        <input
          class="form-input"
          type="password"
          v-model="verify_password"
          placeholder="Verify Password."
        />
        <p class="settings-text" v-if="message.length != 0">{{ message }}</p>
        <button class="buttons" @click="ChangePassword">Confirm</button>
        <button class="buttons" @click="CloseAccountSettings">Close</button>
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
  top: -78px;
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
