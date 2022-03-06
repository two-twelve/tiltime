<template>
  <main>
    <TimerList
      :title="timerGroups[0].title"
      :timers="timerGroups[0].timers" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from './store'
import TimerGroup from './types/timerGroup'
import TimerList from '@/components/TimerList.vue'

export default defineComponent({
  components: {
    TimerList
  },
  setup() {
    useStore().commit(
      'createTimer',
      {
        timerTitle: 'First Timer',
        from: new Date(2022, 0, 1, 0, 0),
        to: new Date(2022, 11, 31, 23, 59),
        groupTitle: 'First Group'
      }
    )
  },
  computed: {
    timerGroups(): Array<TimerGroup> {
      return useStore().state.user.timerGroups
    }
  }
})
</script>

<style lang="scss" scoped></style>
