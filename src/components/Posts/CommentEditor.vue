<script lang="ts">
import axios from 'axios'

type UserInfo = {
  id: Number
  user_name: String
  nick_name: String
  administrator: Boolean
  email: String
  bio: String
  avatar: string
}

export default {
  data() {
    return {
      user_info: {} as UserInfo,
      comment: ''
    }
  },
  props: {
    post_uuid: {
      type: String,
      requrie: true
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.get<UserInfo>('/api/resources/user_info/get', {
          headers: headers
        })
        this.user_info = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async sendComment() {
      const token = 'Bearer ' + localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: token
        }
      }
      const data = {
        post_uuid: this.post_uuid,
        content: this.comment
      }
      if (this.comment != '' && this.comment.length < 1500) {
        try {
          const response = await axios.post('/api/comments/send', data, config)
          if (response.data.Status == 'Success!') {
            this.comment = ''
            this.$emit('update-comments-list')
          }
        } catch (error) {
          console.log(error)
        }
      } else if (this.comment.length > 1500) {
        alert('Content is too long!')
      } else {
        alert('Unable to send comments with empty content!')
      }
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<template>
  <div class="comment-editor">
    <div class="user-aera">
      <div class="avatar-area">
        <img class="avatar" :src="user_info.avatar" />
      </div>
      <p class="user-name-text">{{ user_info.nick_name }}</p>
      <p class="user-name-text comment-words" v-if="comment.length < 1500 && comment.length != 0">
        {{ 1500 - comment.length }}
      </p>
      <p class="user-name-text comment-words comment-words-over" v-if="comment.length > 1500">
        {{ 1500 - comment.length }}
      </p>
    </div>
    <textarea class="editor-area" placeholder="Type your thoughts..." v-model="comment"> </textarea>
    <button class="buttons button-comment" @click="sendComment">Comment</button>
  </div>
</template>

<style scoped>
.comment-editor {
  margin-top: 15px;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.editor-area {
  color: var(--text-font-color);
  width: 80%;
  height: 80px;
  resize: none;
  margin: 0 auto;
  font-size: 18px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  border: none;
  border-bottom: solid 2px #212121;
  outline: none;
  padding: 10px;
  transition: ease-out 250ms;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.editor-area:focus {
  transition: ease-in-out 250ms;
  border-bottom: solid 2px var(--primary-color);
}

.user-aera {
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.avatar-area {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 22px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.user-name-text {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 22px;
  line-height: 50px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.comment-words {
  font-size: 14px;
  color: #bebebe;
  margin-left: auto;
  margin-right: 15px;
  text-shadow: none;
}

.comment-words-over {
  color: var(--accent-color);
}

.button-comment {
  margin-left: auto;
  margin-right: 100px;
}
</style>
