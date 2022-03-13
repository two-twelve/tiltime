<template>
  <main>
    <TimersTabs :timer-groups="store.state.user.timerGroups" @set-index="setTimerTabIndex"/>
    <TimersList class="timers-tab" :timers="store.state.user.timerGroups[timerTabIndex] ? store.state.user.timerGroups[0].timers : []" />
    <NewTimerForm @create='addMockTimer'/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimersTabs from '@/components/TimersTabs.vue'
import TimersList from '@/components/TimersList.vue'
import NewTimerForm from '@/components/NewTimerForm.vue'
import 'vue3-date-time-picker/dist/main.css'

export default defineComponent({
  components: {
    TimersTabs,
    TimersList,
    NewTimerForm,
  },
  data() { return {
    store: useStore(),
    timerTabIndex: 0,
  }},
  methods: {
    setTimerTabIndex(index: number) {
      this.timerTabIndex = index
    },
    addMockTimer(from: Date, to: Date) {
      const groupUUID = this.store.state.user.timerGroups[0] ? this.store.state.user.timerGroups[0].uuid : undefined
      this.store.commit(
        'createTimer',
        {
          timerTitle: 'New Timer',
          from: from,
          to: to,
          groupTitle: 'Home',
          groupUUID: groupUUID
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.timers-tab {
  flex-grow: 1;
}
</style>
