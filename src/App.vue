<template>
  <main>
    <h1>TilTi.me</h1>
    <TimerCard
      :title="'First Timer'"
      :from="new Date(2022, 0, 1, 0, 0)"
      :to="new Date(2022, 0, 21, 21, 45)"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimerCard from '@/components/TimerCard.vue'

export default defineComponent({
  components: {
    TimerCard,
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
