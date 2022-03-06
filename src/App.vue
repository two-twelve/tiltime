<template>
  <main>
    <TimerCard
      :title="'First Timer'"
      :from="new Date(2022, 0, 3, 16, 10)"
      :to="new Date(2022, 11, 31, 23, 59)"
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
