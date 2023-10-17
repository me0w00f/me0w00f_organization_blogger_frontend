import { defineStore } from 'pinia'

export const AuthenticateStatus = defineStore('authenticate_status', {
  state: () => ({
    isLogged: false
  }),
  actions: {
    setLogStatus(status: boolean) {
      this.isLogged = status
    }
  }
})
