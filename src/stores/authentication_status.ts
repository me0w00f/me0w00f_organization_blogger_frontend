import { defineStore } from 'pinia'

// Define the store to save the status of login.
export const AuthenticateStatus = defineStore('authenticate_status', {
  state: () => ({
    // By default the value of it is false.
    isLogged: false
  }),
  actions: {
    // Create an action to change the variable isLogged.
    setLogStatus(status: boolean) {
      this.isLogged = status;
    }
  }
})
