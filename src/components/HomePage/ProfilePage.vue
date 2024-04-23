<script lang="ts">
import axios from 'axios'
import AccountSettings from './AccountSettings.vue'

type UserInfo = {
  id: Number
  user_name: string
  nick_name: string
  administrator: Boolean
  email: string
  bio: string
  avatar: string
}

export default {
  data() {
    return {
      avatar_file: null,
      nick_name: '',
      description: '',
      AccountSettingsON: false
    }
  },
  props: {
    Opened: {
      type: Boolean,
      required: true
    }
  },
  components: {
    AccountSettings
  },
  methods: {
    ClosePage() {
      this.$emit('close-profile-page')
    },
    async getOriginalProfile() {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
        const response = await axios.get<UserInfo>('/api/resources/user_info/get', config)
        this.nick_name = response.data.nick_name
        this.description = response.data.bio
        // console.log(this.nick_name, this.description)
      } catch (error) {
        console.log(error)
      }
    },
    async updateUserInfo() {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      const new_user_info = {
        nick_name: this.nick_name,
        description: this.description
      }
      const response = await axios.put('/api/user/info/modify', new_user_info, config)
      if (response.data.Status == 'Success!') {
        this.$emit('reload-profile')
        this.getOriginalProfile()
      }
    },
    async setUserAvatar() {
      const data = new FormData()
      const token = localStorage.getItem('token')
      const confg = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'multipart/form-data'
        }
      }
      if (this.avatar_file != null) {
        data.append('avatar_file', this.avatar_file)
        const response = await axios.post('/api/user/avatar/set', data, confg)
        if (response.data.Status == 'Success!') {
          this.$emit('reload-profile')
        }
      } else {
        console.log('Unable to set your avatar with an empty file.')
      }
    },
    LoadAvatarFile(event: any) {
      this.avatar_file = event.target.files[0]
      console.log(this.avatar_file)
    },
    submitForm() {
      this.updateUserInfo()
      this.setUserAvatar()
    },
    CloseAccountSettings() {
      this.AccountSettingsON = false
    },
    OpenAccountSettings() {
      this.AccountSettingsON = true
    }
  },
  mounted() {
    this.getOriginalProfile()
  }
}
</script>
<template>
  <div class="profile-container" v-if="Opened">
    <h1 class="profile-title">Profile</h1>
    <div class="form-avatar-change">
      <p class="profile-text">Change your avatar.</p>
      <input class="form-input" type="file" @change="LoadAvatarFile" />
    </div>
    <div class="form-nick-name-and-description-change">
      <p class="profile-text">Edit your nick name</p>
      <input class="form-input" type="text" v-model="nick_name" />
      <p class="profile-text">Edit your description</p>
      <input class="form-input" type="text" v-model="description" />
    </div>
    <div class="button-container">
      <button class="buttons button-profile" @click="OpenAccountSettings">Account Settings</button>
      <button class="buttons button-profile" @click="submitForm">Submit</button>
      <button class="buttons button-profile" @click="ClosePage">close</button>
    </div>
  </div>
  <AccountSettings
    :-opened="AccountSettingsON"
    v-if="AccountSettingsON"
    @close-account-settings="CloseAccountSettings"
  />
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
.profile-container {
  width: 55vw;
  height: 90vh;
  animation: FadeIn 0.5s;
  background-color: #ffffff;
}

.profile-title {
  font-size: 50px;
  line-height: 100px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.form-avatar-change {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-nick-name-and-description-change {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.profile-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 18px;
  line-height: 40px;
  padding-left: 20px;
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

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.button-profile {
  width: 80%;
}

@media only screen and (max-width: 768px) {
  .profile-container {
    width: 100%;
    height: auto;
    animation: FadeIn 0.5s;
    background-color: #ffffff;
  }

  .profile-title {
    font-size: 25px;
    line-height: 40px;
    padding-left: 20px;
    padding-top: 10px;
    cursor: pointer;
    color: var(--text-font-color);
    transition: ease 0.5s;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .form-avatar-change {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .form-nick-name-and-description-change {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-text {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 16px;
    line-height: 25px;
  }

  .form-input {
    width: 80%;
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 18px;
    line-height: 30px;
    border: none;
    border-bottom: solid 2px #212121;
    outline: none;
    margin-bottom: 15px;
    transition: ease-out 250ms;
    margin-left: auto;
    margin-right: auto;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .form-input:focus {
    transition: ease-in-out 250ms;
    border-bottom: solid 2px var(--primary-color);
  }

  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .button-profile {
    width: 80%;
    font-size: 16px;
  }
}
</style>
