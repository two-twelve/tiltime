<template>
  <section>
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
  </section>
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
