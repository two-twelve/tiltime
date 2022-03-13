<template>
  <ul>
    <TimerCard
      v-for="timer of timers"
      :key="timer.uuid"
      :title="timer.title"
      :from="timer.from"
      :to="timer.to"
      :uuid="timer.uuid"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TimerCard from '@/components/TimerCard.vue'
import Timer from '@/types/Timer'

export default defineComponent({
  components: {
    TimerCard,
  },
  props: {
    timers: { type: Array as PropType<Array<Timer>>, required: true }
  },
  setup() {}
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