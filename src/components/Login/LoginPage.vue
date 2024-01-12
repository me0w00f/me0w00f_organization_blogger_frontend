<script lang="ts">
import axios from 'axios'
import { AuthenticateStatus } from '@/stores/authentication_status'

export default {
  data() {
    return {
      no_account: false,
      user_name: '',
      password: '',
      confirm_password: '',
      email: '',
      message: ''
    }
  },
  methods: {
    switch_to_register_or_login() {
      this.no_account = !this.no_account
      this.message = ''
    },
    register_request() {
      if (
        this.user_name != '' &&
        this.password != '' &&
        this.confirm_password != '' &&
        this.email != ''
      ) {
        if (this.password === this.confirm_password) {
          axios
            .post('/api/user/sign_up', {
              user_name: this.user_name,
              password: this.password,
              email: this.email
            })
            .then((response) => {
              console.log(response.data.Status)
              this.confirm_password = ''
              this.email = ''
              this.switch_to_register_or_login()
            })
            .catch((error) => {
              this.message = error.response.data.detail
            })
        } else {
          this.message = 'The password typed twice are different!'
        }
      } else {
        this.message = 'The form cannot be empty!'
      }
    },
    login_request() {
      if (this.user_name != '' && this.password != '') {
        const login_form_data = new FormData()
        login_form_data.append('username', this.user_name)
        login_form_data.append('password', this.password)
        axios
          .post('/api/user/token', login_form_data)
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data.access_token)
              localStorage.setItem('token', response.data.access_token)
              AuthenticateStatus().setLogStatus(true)
              console.log(AuthenticateStatus().isLogged)
              this.user_name = ''
              this.password = ''
              this.confirm_password = ''
              this.email = ''
              this.$router.push('/')
            }
          })
          .catch((error) => {
            this.message = error.response.data.detail
          })
      } else {
        this.message = 'Username or password cannot be empty!'
      }
    }
  }
}
</script>

<template>
  <div class="login-page-container" v-if="no_account == false">
    <h1 class="title-in-login-page">Login to Me0w00f</h1>
    <p class="text-in-login-page">Login to publish and manage contents.</p>
    <input class="input-in-login-page" type="text" placeholder="username" v-model="user_name" />
    <input class="input-in-login-page" type="password" placeholder="password" v-model="password" />
    <button class="buttons button-login" @click="login_request">Sign In</button>
    <a class="swich-link" @click="switch_to_register_or_login"> No Account? Sign up> </a>
    <p class="text-in-login-page">{{ message }}</p>
  </div>
  <div class="login-page-container" v-if="no_account">
    <h1 class="title-in-login-page">Create your account</h1>
    <p class="text-in-login-page">Create an account to publish content.</p>
    <input class="input-in-login-page" type="text" placeholder="username" v-model="user_name" />
    <input class="input-in-login-page" type="password" placeholder="password" v-model="password" />
    <input
      class="input-in-login-page"
      type="password"
      placeholder="confirm password"
      v-model="confirm_password"
    />
    <input class="input-in-login-page" type="text" placeholder="email" v-model="email" />
    <button class="buttons button-login" @click="register_request">Sign Up</button>
    <a class="swich-link" @click="switch_to_register_or_login">
      Have an account already? Sign In>
    </a>
    <p class="text-in-login-page">{{ message }}</p>
  </div>
</template>

<style scoped>
.login-page-container {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: FadeIn 0.5s;
}

.title-in-login-page {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 60px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);  */
  color: var(--text-font-color);
}

.text-in-login-page {
  margin-top: 15px;
  margin-bottom: 25px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 25px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  color: var(--text-font-sub-color);
}

.input-in-login-page {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
  font-size: 25px;
  border: solid 1.6px var(--bottom-border-color);
  background-color: #f1f1f1;
  margin-top: 25px;
  border-radius: 5px;
  width: 500px;
  height: 50px;
  outline: none;
  text-indent: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: var(--text-font-color);
}

.input-in-login-page:focus {
  border: solid 1.6px var(--accent-color);
}

.button-login {
  margin-top: 25px;
  width: 500px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 25px;
}

.swich-link {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 25px;
  line-height: 80px;
  cursor: pointer;
  color: var(--text-font-sub-color);
  transition: 250ms ease-out;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.swich-link:hover {
  color: var(--accent-color);
  filter: brightness(0.95);
  transition: 250ms ease-out;
}

@media only screen and (max-width: 768px) {
  .login-page-container {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: FadeIn 0.5s;
  }

  .title-in-login-page {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 30px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);  */
    color: var(--text-font-color);
  }

  .text-in-login-page {
    margin-top: 15px;
    margin-bottom: 15px;
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 14px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
    color: var(--text-font-sub-color);
  }

  .input-in-login-page {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
    font-size: 18px;
    border: solid 1.6px var(--bottom-border-color);
    background-color: #f1f1f1;
    margin-top: 15px;
    border-radius: 5px;
    width: 80%;
    height: 40px;
    outline: none;
    text-indent: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: var(--text-font-color);
  }

  .input-in-login-page:focus {
    border: solid 1.6px var(--accent-color);
  }

  .button-login {
    margin-top: 15px;
    width: 80%;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 18px;
  }

  .swich-link {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    color: var(--text-font-sub-color);
    transition: 250ms ease-out;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .swich-link:hover {
    color: var(--accent-color);
    filter: brightness(0.95);
    transition: 250ms ease-out;
  }
}
</style>
