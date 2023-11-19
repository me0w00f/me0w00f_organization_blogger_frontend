<script lang="ts">
// UploadPage.vue
import axios from 'axios'

export default {
  data() {
    return {
      posts_title: '',
      tags: '',
      category_id: ''
    }
  },
  props: {
    Opened: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    ClosePage() {
      this.$emit('close-upload-page')
    },
    async UploadPost() {
      try {
        const data = {
          posts_title: this.posts_title,
          tags: this.tags,
          category_id: this.category_id
        }
        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post('/api/posts/create', data, {
          headers: headers
        })
        if (response.data.Status == 'Success') {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    },
    GetAllCategories() {
      // Get all the categories and the id to render a list.
    }
  }
}
</script>
<template>
  <div class="upload-panel-container" v-if="Opened">
    <h1 class="post-title">Send Your Post</h1>
    <div class="from-box">
      <input class="form-input" type="text" placeholder="Title" v-model="posts_title" />
      <input class="form-input" type="text" placeholder="Tags" v-model="tags" />
      <input class="form-input" type="text" placeholder="Category" v-model="category_id" />
      <p class="check-box-text"><input class="check-box" type="checkbox" /> Allow Comments</p>
      <input class="" type="file" />
    </div>
    <div class="button-container">
      <button class="post-button">Post</button>
      <button class="post-button" @click="ClosePage">Close</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  color: var(--text-font-color);
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
}
.upload-panel-container {
  width: 55vw;
  height: 90vh;
  animation: FadeIn 0.5s;
}

.post-title {
  font-size: 50px;
  line-height: 100px;
  padding-left: 20px;
  padding-top: 10px;
  transition: ease 0.5s;
}

.from-box {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.form-input {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-size: 22px;
  line-height: 40px;
  border: none;
  border-bottom: solid 1px #212121;
  outline: none;
  margin-bottom: 15px;
}

.post-button {
  width: 90%;
  height: 55px;
  outline: none;
  border: none;
  background-color: var(--primary-color);
  color: #f1f1f1;
  font-family: 'Itim Regular';
  font-size: 25px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

.post-button:hover {
  transition: ease-in-out 200ms;
  background-color: var(--accent-color);
}

.post-button:active {
  transition: ease-in-out 200ms;
  background-color: rgba(255, 255, 255, 0.5);
}

.button-container {
  align-items: center;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
}

.check-box-text {
  font-size: 18px;
  line-height: 50px;
  padding: 10px;
}

.check-box {
  transform: scale(1.5);
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
