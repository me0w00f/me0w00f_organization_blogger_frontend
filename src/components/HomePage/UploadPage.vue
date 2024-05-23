<script lang="ts">
// UploadPage.vue
import axios from 'axios'

type Categories = {
  id: Number
  category_name: String
  datetime: Date
}

type BlogPost = {
  id: Number
  post_uuid: string
  title: string
  tags: string
  cover_url: string
  author_uuid: string
  author: string
  category_id: Number
  category: string
  comment: Boolean
  create_time: Date
  update_time: Date
  content: String
}

export default {
  data() {
    return {
      post_uuid: '',
      posts_title: '',
      tags: '',
      category_id: '',
      cover_url: '',
      post_file: null,
      allow_comment: true,
      response_message: '',
      update_post: false,
      categories: {} as Categories,
      original_post: {} as BlogPost
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
          data.append('cover_url', this.cover_url)
          data.append('category_id', this.category_id)
          data.append('comment', allow_comment)
          data.append('content_file', this.post_file)
          const response = await axios.post('/api/posts/create', data, config)
          if (response.data.Status == 'Success!') {
            this.$emit('update-post-list')
            this.ClosePage()
          }
        } catch (error: any) {
          this.response_message = error.response.data.detail
          console.log(error)
        }
      } else {
        this.response_message = 'Please finish the form, all the input can not be empty!'
      }
    },
    async UpdatePost() {
      if (
        this.post_uuid != '' &&
        this.posts_title != '' &&
        this.tags != '' &&
        this.cover_url != '' &&
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
          data.append('post_uuid', this.post_uuid)
          data.append('posts_title', this.posts_title)
          data.append('tags', this.tags)
          data.append('cover_url', this.cover_url)
          data.append('category_id', this.category_id)
          data.append('comment', allow_comment)
          data.append('new_content_file', this.post_file)
          const response = await axios.put('/api/posts/update', data, config)
          if ((response.data.Status = 'Success!')) {
            this.$emit('update-post-list')
            this.ClosePage()
          }
        } catch (error: any) {
          this.response_message = error.response.data.detail
          console.log(error)
        }
      } else {
        this.response_message = 'Please finish the form, all the input can not be empty!'
      }
    },
    async GetOriginalData() {
      try {
        const response = await axios.get<BlogPost>('/api/resources/posts/get/' + this.post_uuid)
        this.original_post = response.data
        this.posts_title = this.original_post.title
        this.category_id = this.original_post.category_id.toString()
        this.cover_url = this.original_post.cover_url
        this.tags = this.original_post.tags
      } catch (error) {
        console.log(error)
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
    async sendRequestToServer() {
      if (this.update_post) {
        this.UpdatePost()
      } else {
        this.UploadPost()
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
  <div class="mask">
    <div class="upload-panel-container" v-if="Opened">
      <h1 class="post-title">Send Your Post</h1>
      <div class="from-box">
        <input class="form-input" type="text" placeholder="Cover URL" v-model="cover_url" />
        <input class="form-input" type="text" placeholder="Title" v-model="posts_title" />
        <input class="form-input" type="text" placeholder="Tags" v-model="tags" />
        <input class="form-input" type="text" placeholder="Category ID" v-model="category_id" />
        <table></table>
        <p class="check-box-text">
          <div>
            <input class="check-box" type="checkbox" v-model="allow_comment" /> Allow Comments.
          </div>
          <div>
            <input class="check-box" type="checkbox" v-model="update_post" /> Update an post:
          </div>
          <div>
            <input
            class="form-input"
            type="text"
            placeholder="UUID of the post"
            v-if="update_post"
            v-model="post_uuid"
            @change="GetOriginalData"
          />
          </div>
        </p>
        <input type="file" @change="LoadPostFile" />
      </div>
      <div class="button-container">
        <button class="buttons button-upload" @click="sendRequestToServer">Post</button>
        <button class="buttons button-upload" @click="ClosePage">Close</button>
        <p class="response-message" v-if="response_message != ''">{{ response_message }}</p>
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
  top: -68px;
  position: fixed;
  width: 100%;
  height: 107vh;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
}

.upload-panel-container {
  width: 500px;
  height: auto;
  animation: FadeIn 0.5s;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
}

.post-title {
  font-size: 30px;
  line-height: 60px;
  cursor: default;
  color: var(--text-font-color);
  transition: ease 0.5s;
  padding-left: 20px;
  padding-top: 10px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.from-box {
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.form-input {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 18px;
  line-height: 30px;
  border: none;
  border-bottom: solid 2px #212121;
  outline: none;
  margin-bottom: 10px;
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
  padding: 20px;
}

.button-upload {
  width: 100%;
}

.check-box-text {
  font-size: 18px;
  line-height: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.check-box {
  transform: scale(1.5);
  margin-right: 5px;
  margin-bottom: 5px;
}

.response-message {
  font-size: 14px;
  line-height: 20px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

@media only screen and (max-width: 768px) {
  .mask {
    top: 150px;
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
  }

  .upload-panel-container {
    width: 100%;
    height: 100%;
    box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
    animation: SlideUp 0.5s;
    background-color: #ffffff;
    justify-content: center;
  }

  .post-title {
    font-size: 20px;
    line-height: 40px;
    padding-left: 10px;
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
    padding: 0;
  }

  .form-input {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 16px;
    line-height: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    border-bottom: solid 2px #212121;
    outline: none;
    margin-bottom: 15px;
    transition: ease-out 250ms;
    width: 80%;
    margin-left: auto; 
    margin-right: auto;
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
    font-size: 16px;
  }

  .check-box-text {
    font-size: 14px;
    line-height: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
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
}
</style>
