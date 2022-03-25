<template>
  <nav>
    <router-link class="home-link" to="home">
      <font-awesome-icon class="back-icon" :icon="['fas','arrow-circle-left']" />
      Back To My Timers
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="scss" scoped>
nav {
  width: $app-width;
  max-width: 100%;
  padding: $spacer*2 $spacer*4;
  .home-link {
    font-size: $font-size*1.2;
    font-weight: $font-weight-bold;
    .back-icon {
      margin-right: $spacer * 0.5;
    }
  }
}
</style>