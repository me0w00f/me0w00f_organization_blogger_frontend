<script lang="ts">
export default {
  data(){
    return {
      
    }
  },
  methods:{
    CloseSettingsPanel(){
      this.$emit('close-settings-pannel');
    }
  },
  props:{
    Opened: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
      
  },
}
</script>

<template>
  <div class="mask" v-if="Opened">
    <div class="settings-pannel">
      <div class="menu">

      </div>
      <div class="settings-page">

      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
