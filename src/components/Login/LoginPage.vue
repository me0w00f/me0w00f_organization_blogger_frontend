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
    <button class="login-button-in-login-page" @click="login_request">Sign In</button>
    <button class="login-button-in-login-page" id="sign_up" @click="switch_to_register_or_login">
      No Account? Sign up!
    </button>
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
    <button class="login-button-in-login-page" @click="register_request">Sign Up</button>
    <button class="login-button-in-login-page" id="sign_up" @click="switch_to_register_or_login">
      Have an account already? Sign In!
    </button>
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
  animation: FadeIn 0.8s;
}

.title-in-login-page {
  font-family: 'Itim Regular';
  font-size: 64px;
  color: var(--text-font-color);
}

.text-in-login-page {
  margin-bottom: 25px;
  font-family: 'Itim Regular';
  font-size: 25px;
  color: var(--text-font-color);
}

.input-in-login-page {
  font-family: 'Itim Regular';
  /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
  font-size: 25px;
  outline: none;
  border: solid 1.6px var(--bottom-border-color);
  background-color: #f1f1f1;
  margin-top: 20px;
  border-radius: 5px;
  width: 400px;
  text-indent: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: var(--text-font-color);
}

.input-in-login-page:focus {
  border: solid 1.6px var(--accent-color);
}

.login-button-in-login-page {
  margin-top: 20px;
  width: 400px;
  height: 40px;
  outline: none;
  background-color: var(--primary-color);
  border: none;
  color: #f1f1f1;
  font-family: 'Itim Regular';
  font-size: 20px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}

.login-button-in-login-page:hover {
  transition: ease-in-out 200ms;
  background-color: var(--accent-color);
}

.login-button-in-login-page:active {
  transition: ease-in-out 200ms;
  background-color: rgba(255, 255, 255, 0.5);
}

#sign_up {
  background-color: #ebebeb;
  text-shadow: none;
  color: var(--text-font-color);
}

#sign_up:hover {
  transition: ease-in-out 200ms;
  background-color: var(--accent-color);
}

#sign_up:active {
  transition: ease-in-out 200ms;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
