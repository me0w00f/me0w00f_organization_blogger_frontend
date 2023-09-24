<script lang="ts">
export default {
  data(){
    return {
      
    }
  }
}
</script>

<template>
  <div class="login-page-container">
    <h1 class="title-in-login-page">Login to Me0w00f</h1>
    <p class="text-in-login-page">Login to send posts and manage contents.</p>
    
    <input class="input-in-login-page" type="text" placeholder="USERNAME"/>
    <input class="input-in-login-page" type="password" placeholder="PASSWORD"/>
    <button class="login-button-in-login-page">Sign In</button>
    <button class="login-button-in-login-page" id="sign_up">No Account? Sign up!</button>
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
  animation: FadeIn 1s;
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
