<script lang="ts">
import axios from 'axios'

type PostsOfThisUser = {
  id: Number
  category_id: Number
  title: String
  tags: String
  author_uuid: String
  post_uuid: String
  comment: Boolean
  update_time: Date
  create_time: Date
}

type PostListOfThisUser = PostsOfThisUser[]

export default {
  data() {
    return {
      page: 1 as Number,
      post_list_to_render: [] as PostListOfThisUser
    }
  },
  methods: {
    ClosePage() {
      this.$emit('close-management-page')
    },
    async GetOwnedPosts(page: Number) {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      await axios
        .get<PostListOfThisUser>('/api/resources/posts/per_user/' + page, config as any)
        .then((response) => {
          this.post_list_to_render = response.data
          console.log(this.post_list_to_render)
        })
    },
    async DeletePost(postUUID: string | Blob) {
      let formData = new FormData()
      formData.append('post_uuid', postUUID)
      const token: String = localStorage.getItem('token') as String
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }
      await axios.delete('/api/posts/delete', config).then((response) => {
        if (response.data.Status == 'Success!') {
          this.GetOwnedPosts(this.page)
        }
      })
    }
  },
  props: {
    Opened: Boolean
  },
  mounted() {
    this.GetOwnedPosts(this.page)
  }
}
</script>

<template>
  <div class="management-panel" v-if="Opened">
    <h1 class="management-title">Management</h1>
    <table>
      <thead>
        <tr>
          <th>Post UUID</th>
          <th>Title</th>
          <th>Create Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in post_list_to_render">
          <td>{{ item.post_uuid }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.create_time }}</td>
          <td>
            <!-- <button class="buttons">Update</button> -->
            <button class="buttons" @click="DeletePost(item.post_uuid as string)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="buttons" @click="ClosePage">Close</button>
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

.management-title {
  font-size: 50px;
  line-height: 100px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
}

.management-panel {
  width: 55vw;
  height: 90vh;
  animation: FadeIn 0.5s;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
}

th,
td {
  border: 1px solid black;
  padding-left: 8px;
  padding-right: 8px;
  text-align: left;
}
th {
  padding-top: 10px;
  padding-bottom: 10px;
}
tr:nth-child(odd) {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: #f1f1f1;
}
</style>
