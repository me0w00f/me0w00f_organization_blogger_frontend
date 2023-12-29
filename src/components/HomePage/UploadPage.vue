<script lang="ts">
// UploadPage.vue
import axios from 'axios'

type Categories = {
  id: Number
  category_name: String
  datetime: Date
}

export default {
  data() {
    return {
      posts_title: '',
      tags: '',
      category_id: '',
      post_file: null,
      allow_comment: true,
      response_message: '',
      categories: {} as Categories
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
      this.response_message = ''
      this.$emit('close-upload-page')
    },
    async UploadPost() {
      if (
        this.posts_title != '' &&
        this.tags != '' &&
        this.category_id != null &&
        this.post_file != null
      ) {
        try {
          const data = new FormData()
          let allow_comment
          if (this.allow_comment) {
            allow_comment = 'true'
          } else {
            allow_comment = 'false'
          }
          const config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Content-type': 'multipart/form-data'
            }
          }
          data.append('posts_title', this.posts_title)
          data.append('tags', this.tags)
          data.append('category_id', this.category_id)
          data.append('comment', allow_comment)
          data.append('content_file', this.post_file)
          const response = await axios.post('/api/posts/create', data, config)
          if (response.data.Status == 'Success!') {
            this.$emit('update-post-list')
            this.ClosePage()
          }
        } catch (error: any) {
          this.response_message = error.detail
          console.log(error)
        }
      } else {
        this.response_message = 'Please finish the form, all the input can not be empty!'
      }
    },
    async GetAllCategories() {
      try {
        const response = await axios.get<Categories>('/api/posts/categories/getAll')
        this.categories = response.data
        // console.log(this.categories)
      } catch (error) {
        console.log(error)
      }
    },
    LoadPostFile(event: any) {
      this.post_file = event.target.files[0]
      console.log(this.post_file)
      console.log(this.allow_comment)
    }
  },
  mounted() {
    this.GetAllCategories()
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
      <table></table>
      <p class="check-box-text">
        <input class="check-box" type="checkbox" v-model="allow_comment" /> Allow Comments
      </p>
      <input type="file" @change="LoadPostFile" />
    </div>
    <div class="button-container">
      <button class="buttons button-upload" @click="UploadPost">Post</button>
      <button class="buttons button-upload" @click="ClosePage">Close</button>
      <p class="response-message" v-if="response_message != ''">{{ response_message }}</p>
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
  color: var(--text-font-color);
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.from-box {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  align-items: center;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
}

.button-upload {
  width: 80%;
}

.check-box-text {
  font-size: 18px;
  line-height: 50px;
  padding: 10px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.check-box {
  transform: scale(1.5);
  margin-right: 5px;
  margin-bottom: 5px;
}

.response-message {
  font-size: 18px;
  line-height: 50px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}
</style>
