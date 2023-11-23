<script lang="ts">
import axios from 'axios'
import MarkDownItHighlightjs from 'markdown-it-highlightjs'
import CommentEditor from './CommentEditor.vue'
type CommentData = {
  id: Number
  comment_uuid: String
  post_uuid: String
  user_uuid: String
  nick_name: String
  avatar: string
  content: String
  date: Date
}

type BlogPost = {
  id: Number
  post_uuid: string
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

type CommentDataList = CommentData[]

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
      ],
      comments: [] as CommentData[]
    }
  },
  methods: {
    async getThePost() {
      this.isLoading = true
      try {
        const response = await axios.get<BlogPost>('/api/resources/posts/get/' + this.post_uuid)
        this.post_data = response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async getComment() {
      try {
        const response = await axios.get<CommentDataList>(
          '/api/comments/get_in_a_post/' + this.post_uuid
        )
        this.comments = response.data
        console.log(this.comments)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    CommentEditor
  },
  beforeMount() {
    this.getThePost()
    this.getComment()
  }
}
</script>

<template>
  <div class="posts-page-container">
    <h1 class="post-title">{{ post_data.title }}</h1>
    <h2 class="post-info-text">
      {{ post_data.author }} | {{ post_data.category }} | CREATE:{{ post_data.create_time }} |
      UPDATE:{{ post_data.update_time }}
    </h2>
    <div class="content-text" v-html="post_data.content"></div>
    <div class="CommentAera">
      <CommentEditor :post_uuid="post_uuid as string" @update-comments-list="getComment" />
      <div class="comment-display-area" v-for="items in comments">
        <div class="comment-item">
          <div class="info-area">
            <div class="avatar-area">
              <img class="avatar" :src="items.avatar" />
            </div>
            <p class="user-name-text">{{ items.nick_name }}</p>
            <p class="date-text">{{ items.date }}</p>
          </div>
          <div class="content-area">
            <p class="content-text">{{ items.content }}</p>
          </div>
        </div>
      </div>
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
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 325;
  line-height: 60px;
  font-size: 20px;
  padding-left: 30px;
  padding-top: 10px;
  color: var(--text-font-color);
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}

.post-title {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 400;
  font-size: 50px;
  line-height: 80px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
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
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 300;
  color: var(--text-font-sub-color);
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}

.CommentAera {
  width: 100%;
  height: auto;
}

.comment-display-area {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comment-item {
  width: 80%;
  height: auto;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px var(--text-font-color);
  margin-bottom: 20px;
}

.avatar-area {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 20px;
}

.info-area {
  flex-direction: row;
  display: flex;
}
.user-name-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 22px;
  line-height: 50px;
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.date-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 16px;
  line-height: 50px;
  color: #414141;
  margin-left: auto;
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}

.content-area {
  display: flex;
  justify-content: first baseline;
}

.content-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 350;
  font-size: 20px;
  line-height: 40px;
  color: var(--text-font-sub-color);
  padding-left: 75px;
  padding-right: 75px;
  text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3);
}
</style>
