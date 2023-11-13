<script lang="ts">
import axios from 'axios'
import MarkDownItHighlightjs from 'markdown-it-highlightjs'

// Define the type BlogPost,
// which contains the data from server.
type BlogPost = {
  id: Number
  post_uuid: String
  title: String
  tags: String
  author_uuid: String
  author: String
  category_id: Number
  category: String
  comment: Boolean
  create_time: Date
  update_time: Date
  content: String
}

type PostComment = {
  comment_uuid: string
}

export default {
  data() {
    return {
      post_uuid: this.$route.params.post_uuid,
      isLoading: false,
      post_data: {} as BlogPost,
      plugins: [
        {
          plugin: MarkDownItHighlightjs
        }
      ]
    }
  },
  methods: {
    // Get all the posts from the server.
    async getThePost() {
      this.isLoading = true
      try {
        // Send request to the server.
        const response = await axios.get<BlogPost>('/api/resources/posts/get/' + this.post_uuid)
        // Get the data from the response.
        this.post_data = response.data;
      } catch (error) {
        // If there are some errors from the server,
        // then print the information of the error on the console.
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  },
  beforeMount() {
    // In the Lifecycle beforeMount,
    // it will run the method getThePost() to get the data of all posts from the server.
    this.getThePost()
  }
}
</script>

<template>
  <div class="posts-page-container">
    <h1 class="post-title">{{ post_data.title }}</h1>
    <h2 class="post-info-text">{{ post_data.author }} | {{ post_data.category }} | CREATE:{{ post_data.create_time }} | UPDATE:{{ post_data.update_time }}</h2>
    <div class="content-text" v-html="post_data.content">
    </div>
  </div>
</template>

<style scoped>


.posts-page-container {
  width: 55vw;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.5s;
}

.content-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 325;
  line-height: 60px;
  font-size: 20px;
  padding-left: 30px;
  padding-top: 10px;
  color: #212121;
}

.post-title {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 400;
  font-size: 50px;
  line-height: 80px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  transition: ease 0.5s;
}

.post-title:hover {
  transition: ease 0.5s;
  color: var(--accent-color);
}

.post-info-text {
  font-size: 18px;
  line-height: 80px;
  padding-left: 30px;
  padding-top: 10px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 300;
}
</style>
