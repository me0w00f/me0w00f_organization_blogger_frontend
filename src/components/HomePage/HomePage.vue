<script lang="ts">
import axios from 'axios'
import { AuthenticateStatus } from '@/stores/authentication_status'
import { storeToRefs } from 'pinia'
import UploadPage from './UploadPage.vue'
import ProfilePage from './ProfilePage.vue'
import ManagementPage from '../Management/ManagementPage.vue'
import moment from 'moment-timezone'

type BlogPost = {
  id: Number
  post_uuid: string
  title: string
  author_uuid: string
  author_name: string
  cover_url: string
  tags: string
  category_id: Number
  category: string
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
      ProfilePageON: false,
      ManagePageON: false
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
      if (this.isLogged) {
        try {
          const config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
          const response = await axios.get<UserInfo>('/api/resources/user_info/get', config)
          this.user_info = response.data
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('Not logged.')
      }
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
      this.ManagePageON = false
    },
    CloseUploadPage() {
      this.UploadPageON = false
    },
    OpenProfilePage() {
      this.ProfilePageON = true
      this.UploadPageON = false
      this.ManagePageON = false
    },
    CloseProfilePage() {
      this.ProfilePageON = false
    },
    OpenManagePage() {
      this.ManagePageON = true
      this.UploadPageON = false
      this.ProfilePageON = false
    },
    CloseManagePage() {
      this.ManagePageON = false
      this.getPosts(this.page)
    },
    ChangeTimeZone(date: Date) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const date_to_return = moment.utc(date).tz(timezone).format('YYYY-MM-DD HH:mm')
      return date_to_return
    }
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
    ProfilePage,
    ManagementPage
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
        <button class="buttons account-button" @click="OpenProfilePage">Profile</button>
        <button
          class="buttons account-button"
          v-if="user_info.administrator"
          @click="OpenUploadPage"
        >
          Post
        </button>
        <button
          class="buttons account-button"
          v-if="user_info.administrator"
          @click="OpenManagePage"
        >
          Manage
        </button>
      </div>
    </div>
    <ProfilePage
      v-if="ProfilePageON"
      :Opened="ProfilePageON"
      @close-profile-page="CloseProfilePage"
      @reload-profile="getUserInfo"
    />
    <UploadPage
      v-if="UploadPageON"
      :Opened="UploadPageON"
      @close-upload-page="CloseUploadPage"
      @update-post-list="getPosts(page)"
    />
    <ManagementPage
      v-if="ManagePageON"
      :Opened="ManagePageON"
      @close-management-page="CloseManagePage"
    />
    <div
      class="article-list"
      v-if="UploadPageON == false && ProfilePageON == false && ManagePageON == false"
    >
      <p class="post-info-text" v-if="isLoading">Loading.....</p>
      <div class="post-items" v-for="post in posts.data">
        <div class="post-items-cover">
          <img
            :src="post.cover_url"
            @click="ReadPost(post.post_uuid)"
            v-if="post.cover_url != null"
          />
          <img src="src/assets/icons/logo-color.png" @click="ReadPost(post.post_uuid)" v-else />
        </div>
        <div class="post-items-info">
          <h1 class="post-title" @click="ReadPost(post.post_uuid)">{{ post.title }}</h1>
          <div class="mid-control">
            <p class="post-info-text">{{ post.author_name }}</p>
            <p class="post-info-text">{{ post.category }}</p>
            <p class="post-info-text">{{ post.tags }}</p>
          </div>
          <div class="foot-control">
            <!-- <p class="post-info-text posts-update">updated {{ calculateTimeAgo(post.update_time) }}</p> -->
            <p class="post-info-text posts-create">{{ ChangeTimeZone(post.create_time) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tags-list">
      <!-- Show All tags here -->
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 450;
  color: var(--text-font-color);
}

p {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
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
  background-color: #ffffff;
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

.avatar-img:hover {
  position: relative;
  top: -10px;
}

.user-name-text {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', system-ui, sans;
  font-size: 25px;
  text-align: center;
  line-height: 50px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.bio-text {
  color: var(--text-font-color);
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-size: 18px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  text-align: left;
  line-height: 25px;
  padding: 30px;
}

.article-list {
  width: 55vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  animation: FadeIn 0.5s;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: #ffffff;
}

.post-items {
  width: 95%;
  height: 280px;
  /* box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.2); */
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
}

.post-items-info {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.post-items-cover {
  width: 50%;
  height: 250px;
  justify-content: center;
  padding-bottom: 30px;
}

.post-items-cover img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: ease-in-out 500ms;
  cursor: pointer;
}

.post-items-cover img:hover {
  transform: scale(0.955);
  transition: ease-in-out 500ms;
}

.post-title {
  font-size: 25px;
  line-height: 40px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  transition: ease 0.5s;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
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
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
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

.posts-create {
  margin-left: auto;
  margin-right: 10px;
}
.button-container {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
}

@media only screen and (max-width: 768px) {
  .home-page-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .account-info {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    animation: FadeIn 0.5s;
    margin-right: none;
    background-color: #ffffff;
  }

  .avatar {
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    transition: 1000ms;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    transition: 1000ms;
    /* background-color: #f3f3f3; */
  }

  .avatar-img:hover {
    position: relative;
    top: -10px;
    transition: 1000ms;
  }

  .user-name-text {
    color: var(--text-font-color);
    font-family: 'Mooli-Regular', system-ui, sans;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .bio-text {
    color: var(--text-font-color);
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 14px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
    text-align: center;
    line-height: 20px;
    padding: 5px;
  }

  .article-list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    animation: FadeIn 0.5s;
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: #ffffff;
  }

  .post-items {
    width: 100%;
    height: auto;
    /* box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.2); */
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }
  .post-items-info {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .post-items-cover {
    width: 95%;
    height: 250px;
    justify-content: center;
    padding-bottom: 30px;
    padding: 10px
  }

  .post-items-cover img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: ease-in-out 500ms;
    cursor: pointer;
  }

  .post-items-cover img:hover {
    transform: scale(0.955);
    transition: ease-in-out 500ms;
  }
  .post-title {
    font-size: 18px;
    line-height: 30px;
    /* padding-left: 20px;
    padding-top: 10px; */
    cursor: pointer;
    transition: ease 0.5s;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .post-title:hover {
    transition: ease 0.5s;
    color: var(--accent-color);
  }

  .post-info-text {
    font-size: 14px;
    line-height: 20px;
    padding-left: 40px;
    padding-right: auto;
    padding-top: 0px;
    text-shadow: none;
  }

  .tags-list {
    width: 25vw;
    height: 100px;
  }

  .mid-control {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .foot-control {
    margin-top: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }

  .posts-create {
    margin-left: auto;
    margin-right: 10px;
  }

  .button-container {
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  .account-button {
    font-size: 16px;
  }
}
</style>
