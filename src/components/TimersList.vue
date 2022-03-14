<template>
  <ul>
    <TimerCard
      v-for="timer of store.getters.activeTimers"
      :key="timer.uuid"
      :title="timer.title"
      :from="timer.from"
      :to="timer.to"
      :uuid="timer.uuid"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimerCard from '@/components/TimerCard.vue'

export default defineComponent({
  components: {
    TimerCard,
  },
  data() { return {
    store: useStore()
  }}
})
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
</style>