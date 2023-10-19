<script lang="ts">
import axios from 'axios'
import VueMarkdown from 'vue-markdown-render'

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



export default {
  data() {
    return {
      post_uuid: this.$route.params.post_uuid,
      isLoading: false,
      post_data: {} as BlogPost
    }
  },
  methods: {
    async getThePost() {
      this.isLoading = true
      try {
        const response = await axios.get<BlogPost>('/api/resources/posts/get/' + this.post_uuid)
        this.post_data = response.data
        console.log(this.post_data.content);
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  },
  components: {
    VueMarkdown
  },
  beforeMount() {
    this.getThePost()
  }
}
</script>

<template>
  <div class="posts-page-container">
    <h1 class="post-title">{{ post_data.title }}</h1>
    <h2 class="post-info-text">{{ post_data.author }}</h2>
    <div class="content-text">
      <vue-markdown :source="post_data.content"/>
    </div>
    
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  color: var(--text-font-color);
}

h2 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  color: var(--text-font-color);
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
}
.posts-page-container {
  width: 40vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.8s;
}

.content-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-weight: 450;
  line-height: 40px;
  font-size: 16px;
  padding-left: 30px;
  padding-top: 10px;
  color: #212121;
}


.post-title {
  font-size: 25px;
  line-height: 40px;
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
  font-size: 16px;
  line-height: 20px;
  padding-left: 30px;
  padding-top: 10px;
}


</style>
