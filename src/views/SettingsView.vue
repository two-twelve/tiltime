<template>
  <div class="title-container">
    <router-link class="home-link" to="home">
      <font-awesome-icon class="icon" :icon="['fas','arrow-alt-circle-left']" />
      Back To My Timers
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="scss" scoped>
.title-container {
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  .home-link {
    padding: $spacer*2 $spacer*4 $spacer*4 $spacer*4;
    width: $app-width;
    max-width: 100%;
    font-size: $font-size * 1.2;
    font-weight: $font-weight-bold;
    .icon {
      margin-right: $spacer;
    }
  }
}
</style>