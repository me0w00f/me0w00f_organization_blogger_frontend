<script lang="ts">
import axios from 'axios'
import { AuthenticateStatus } from '@/stores/authentication_status'
import { storeToRefs } from 'pinia'
import MarkDownItHighlightjs from 'markdown-it-highlightjs'
import CommentEditor from './CommentEditor.vue'
import moment from 'moment-timezone'

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
      comments: [] as CommentData[],
      comment_allow: false
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
    },
    CheckLoggingStatus() {
      if (this.logStatus.isLogged) {
        this.comment_allow = true
      } else {
        this.comment_allow = false
      }
    },
    ChangeTimeZone(date: Date) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const date_to_return = moment.utc(date).tz(timezone).format('YYYY-MM-DD HH:mm')
      return date_to_return
    },
    calculateTimeAgo(date: moment.MomentInput) {
      const now = moment()
      const postDate = moment(date)
      const diffSeconds = now.diff(postDate, 'seconds')

      if (diffSeconds < 60) {
        return diffSeconds <= 1 ? 'just now' : `${diffSeconds} seconds ago`
      } else {
        const diffMinutes = now.diff(postDate, 'minutes')

        if (diffMinutes < 60) {
          return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
        } else {
          const diffHours = now.diff(postDate, 'hours')

          if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
          } else {
            const diffDays = now.diff(postDate, 'days')

            if (diffDays < 7) {
              return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
            } else {
              const diffWeeks = now.diff(postDate, 'weeks')

              if (diffWeeks < 4) {
                return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
              } else {
                const diffMonths = now.diff(postDate, 'months')

                if (diffMonths < 12) {
                  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
                } else {
                  const diffYears = now.diff(postDate, 'years')
                  return diffYears >= 10
                    ? 'over 10 years ago'
                    : `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    CommentEditor
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
      {{ post_data.author }} | {{ post_data.category }} | CREATE:
      {{ ChangeTimeZone(post_data.create_time) }} | UPDATE:
      {{ calculateTimeAgo(ChangeTimeZone(post_data.update_time)) }}
    </h2>
    <div class="content-text" v-html="post_data.content"></div>
    <div class="CommentAera">
      <CommentEditor
        v-if="comment_allow"
        :post_uuid="post_uuid as string"
        @update-comments-list="getComment"
      />
      <div
        class="comment-display-area"
        v-for="items in comments"
        :id="items.comment_uuid as string"
      >
        <div class="comment-item">
          <div class="info-area">
            <div class="avatar-area">
              <img class="avatar" :src="items.avatar" />
            </div>
            <p class="user-name-text">{{ items.nick_name }}</p>
            <p class="date-text">{{ calculateTimeAgo(ChangeTimeZone(items.date)) }}</p>
          </div>
          <div class="content-area">
            <p class="content-text-comment">{{ items.content }}</p>
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
  animation: FadeIn 500ms;
  background-color: #ffffff;
}

.content-text {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 325;
  font-size: 20px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 10px;
  color: var(--text-font-color);
  /* line-height: 25px; */
  animation: FadeIn 500ms;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}
.post-title {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
  padding-left: 100px;
  padding-top: 30px;
  padding-bottom: 30px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
  animation: FadeIn 500ms;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.post-title:hover {
  transition: ease 0.5s;
  color: var(--accent-color);
}

.post-info-text {
  font-size: 18px;
  line-height: 30px;
  padding-left: 100px;
  padding-top: 10px;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 300;
  color: var(--text-font-sub-color);
  animation: FadeIn 500ms;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.CommentAera {
  width: 100%;
  height: auto;
  animation: FadeIn 500ms;
}

.comment-display-area {
  margin-top: 30px;
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
  /* border-bottom: solid 1px var(--text-font-color); */
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
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
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
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
}

.content-area {
  display: flex;
  justify-content: first baseline;
}

.content-text-comment {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 350;
  font-size: 20px;
  line-height: 30px;
  color: var(--text-font-sub-color);
  padding-left: 75px;
  padding-right: 75px;
  /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  white-space: pre-wrap;
}

@media only screen and (max-width: 768px) {
  .posts-page-container {
    width: 100%;
    height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    animation: FadeIn 500ms;
  }

  .content-text {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-weight: 325;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    color: var(--text-font-color);
    /* line-height: 28px; */
    animation: FadeIn 500ms;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .post-title {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    color: var(--text-font-color);
    transition: ease 0.5s;
    animation: FadeIn 500ms;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .post-title:hover {
    transition: ease 0.5s;
    color: var(--accent-color);
  }

  .post-info-text {
    font-size: 14px;
    line-height: 30px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-weight: 300;
    color: var(--text-font-sub-color);
    animation: FadeIn 500ms;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .CommentAera {
    width: 100%;
    height: auto;
    animation: FadeIn 500ms;
  }

  .comment-display-area {
    margin-top: 30px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment-item {
    width: 80%;
    height: auto;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    /* border-bottom: solid 1px var(--text-font-color); */
    margin-bottom: 20px;
  }

  .avatar-area {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    margin-right: 10px;
  }

  .info-area {
    flex-direction: row;
    display: flex;
  }
  .user-name-text {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 16px;
    line-height: 30px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }
  .avatar {
    width: 25px;
    height: 25px;
    border-radius: 100%;
  }

  .date-text {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-size: 14px;
    line-height: 25px;
    color: #414141;
    margin-left: auto;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
  }

  .content-area {
    display: flex;
    justify-content: first baseline;
  }

  .content-text-comment {
    font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
    font-weight: 350;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-font-sub-color);
    padding-left: 35px;
    padding-right: 5px;
    /* text-shadow: 0px 0px 2px rgba(13, 13, 13, 0.3); */
    white-space: pre-wrap;
  }
}
</style>
