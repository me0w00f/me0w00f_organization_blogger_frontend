<script lang="ts">
import axios from 'axios'
import { AuthenticateStatus } from '@/stores/authentication_status'
import { storeToRefs } from 'pinia'
import UploadPage from './UploadPage.vue'
import ProfilePage from './ProfilePage.vue'

type BlogPost = {
  id: Number
  post_uuid: String
  title: String
  author_uuid: String
  author_name: String
  tags: String
  category_id: Number
  category: String
  comment: Boolean
  create_time: Date
  update_time: Date
}

type UserInfo = {
  id: Number
  user_name: String
  nick_name: String
  administrator: Boolean
  email: String
  bio: String
  avatar: string
}

type PostList = BlogPost[]

export default {
  data() {
    return {
      posts: { data: [] as BlogPost[] },
      isLoading: false,
      page: 1,
      user_info: {} as UserInfo,
      isLogged: false,
      UploadPageON: false,
      ProfilePageON: false
    }
  },
  methods: {
    async getPosts(page?: Number) {
      this.isLoading = true
      try {
        const response = await axios.get<PostList>('/api/resources/posts/' + page?.toString())
        this.posts.data = response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async getUserInfo() {
      try {
        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.get<UserInfo>('/api/resources/user_info/get', {
          headers: headers
        })
        this.user_info = response.data
      } catch (error) {}
    },
    ReadPost(post_uuid: String) {
      this.$router.push('/posts/' + post_uuid)
    },
    CheckLoggingStatus() {
      if (this.logStatus.isLogged) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    },
    OpenUploadPage() {
      this.UploadPageON = true
      this.ProfilePageON = false
    },
    CloseUploadPage() {
      this.UploadPageON = false
    },
    OpenProfilePage() {
      this.ProfilePageON = true
      this.UploadPageON = false
    },
    CloseProfilePage() {
      this.ProfilePageON = false
    },
    ManageMent() {}
  },
  setup() {
    const logStatus = AuthenticateStatus()
    const UpdateLogStatus = storeToRefs(logStatus)
    return {
      UpdateLogStatus,
      logStatus
    }
  },
  watch: {
    'logStatus.isLogged'(newValue, oldValue) {
      this.CheckLoggingStatus()
    }
  },
  mounted() {
    this.CheckLoggingStatus()
    this.getPosts(this.page)
    this.getUserInfo()
  },
  components: {
    UploadPage,
    ProfilePage
  }
}
</script>

<template>
  <div class="home-page-container">
    <div class="account-info">
      <div class="avatar" v-if="isLogged">
        <img class="avatar-img" :src="user_info.avatar" />
      </div>
      <p class="user-name-text" v-if="isLogged">{{ user_info.nick_name }}</p>
      <p class="bio-text" v-if="isLogged">
        {{ user_info.bio }}
      </p>
      <div class="button-container" v-if="isLogged">
        <button class="post-upload-button" @click="OpenProfilePage">Profile</button>
        <button class="post-upload-button" v-if="user_info.administrator" @click="OpenUploadPage">
          Post
        </button>
        <button class="post-upload-button" v-if="user_info.administrator">Manage</button>
      </div>
    </div>
    <ProfilePage :Opened="ProfilePageON" @close-profile-page="CloseProfilePage" />
    <UploadPage :Opened="UploadPageON" @close-upload-page="CloseUploadPage" />
    <div class="article-list" v-if="UploadPageON == false && ProfilePageON == false">
      <p class="post-info-text" v-if="isLoading">Loading.....</p>
      <div class="post-items" v-for="post in posts.data">
        <h1 class="post-title" @click="ReadPost(post.post_uuid)">{{ post.title }}</h1>
        <div class="mid-control">
          <p class="post-info-text">{{ post.author_name }}</p>
          <p class="post-info-text">{{ post.category }}</p>
          <p class="post-info-text">{{ post.tags }}</p>
        </div>
        <div class="foot-control">
          <p class="post-info-text posts-update">{{ post.update_time }}</p>
          <p class="post-info-text posts-create">{{ post.create_time }}</p>
        </div>
      </div>
    </div>
    <div class="tags-list"></div>
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

.home-page-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.account-info {
  width: 20vw;
  height: auto;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.5s;
  margin-right: auto;
}

.avatar {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  /* background-color: #f3f3f3; */
}

.user-name-text {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular';
  font-size: 25px;
  text-align: center;
  line-height: 50px;
}

.bio-text {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght';
  font-size: 18px;
  text-align: center;
  line-height: 25px;
  padding: 5px;
}

.article-list {
  width: 55vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.5s;
  overflow-y: scroll;
  scrollbar-width: none;
}

.post-items {
  width: 95%;
  height: 150px;
  /* box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.2); */
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
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

.tags-list {
  width: 25vw;
  height: 100px;
}

.mid-control {
  display: flex;
  flex-direction: row;
}

.foot-control {
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.posts-update {
  margin-left: auto;
}

.posts-create {
  margin-right: 10px;
}

.post-upload-button {
  width: 100px;
  height: 40px;
  outline: none;
  border: none;
  background-color: var(--primary-color);
  color: #f1f1f1;
  font-family: 'Itim Regular';
  font-size: 20px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}

.post-upload-button:hover {
  transition: ease-in-out 200ms;
  background-color: var(--accent-color);
}

.post-upload-button:active {
  transition: ease-in-out 200ms;
  background-color: rgba(255, 255, 255, 0.5);
}

.button-container {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
