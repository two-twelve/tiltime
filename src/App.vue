<template>
  <main>
    <TimersTab :timers="timerGroups[0].timers" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimerGroup from '@/types/timerGroup'
import TimersTab from '@/components/TimersTab.vue'

export default defineComponent({
  components: {
    TimersTab
  },
  setup() {
    useStore().commit(
      'createTimer',
      {
        timerTitle: 'New Years 2022!',
        from: new Date(2022, 0, 1, 0, 0),
        to: new Date(2022, 11, 31, 23, 59),
        groupTitle: 'Home'
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
