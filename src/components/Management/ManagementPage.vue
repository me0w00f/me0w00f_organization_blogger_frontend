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

type CategoryWithNumbers = {
  category_id: Number
  category_name: String
  number_of_posts: Number
}

type CategoryList = CategoryWithNumbers[]

type PostListOfThisUser = PostsOfThisUser[]

export default {
  data() {
    return {
      page: 1 as Number,
      post_list_to_render: [] as PostListOfThisUser,
      categories_list: [] as CategoryList
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
    async GetCategories() {
      const response = await axios.get<CategoryList>('/api/posts/categories/getAll')
      this.categories_list = response.data
      console.log(this.categories_list)
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
    this.GetCategories()
  }
}
</script>

<template>
  <div class="management-panel" v-if="Opened">
    <h1 class="management-title">Management</h1>
    <h2 class="management-subtitle">Your Posts</h2>
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
    <h2 class="management-subtitle">Categories</h2>
    <table>
      <thead>
        <tr>
          <th>Category ID</th>
          <th>Category</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in categories_list">
          <td>{{ item.category_id }}</td>
          <td>{{ item.category_name }}</td>
          <td>{{ item.number_of_posts }}</td>
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

h2 {
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
  font-weight: 420;
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
  padding-top: 10px;
  cursor: pointer;
  color: var(--text-font-color);
  transition: ease 0.5s;
}

.management-subtitle {
  line-height: 60px;
}

.management-panel {
  width: 55vw;
  height: 90vh;
  animation: FadeIn 0.5s;
}

table {
  width: auto;
  border-collapse: collapse;
  font-family: 'Mooli-Regular', 'NotoSansSC-VariableFont_wght', system-ui, sans;
}

th,
td {
  border: 1px solid black;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
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

@media only screen and (max-width: 768px) {
  .management-title {
    font-size: 25px;
    line-height: 40px;
    padding-top: 10px;
    cursor: pointer;
    color: var(--text-font-color);
    transition: ease 0.5s;
    padding-left: 20px;
  }

  .management-subtitle {
    font-size: 18px;
    padding-left: 20px;
    line-height: 60px;
  }

  .management-panel {
    width: 100%;
    height: auto;
    animation: FadeIn 0.5s;
  }
}
</style>
