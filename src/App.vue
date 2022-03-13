<template>
  <main>
    <TimersTab class="timers-tab" :timers="store.state.user.timerGroups[0] ? store.state.user.timerGroups[0].timers : []" />
    <NewTimerForm @create='addMockTimer'/>
  </main>
  <p class="state">{{ store.state.user }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimersTab from '@/components/TimersTab.vue'
import NewTimerForm from '@/components/NewTimerForm.vue'
import 'vue3-date-time-picker/dist/main.css'

export default defineComponent({
  components: {
    TimersTab,
    NewTimerForm,
  },
  data() { return {
    store: useStore(),
  }},
  methods: {
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
.state {
  background: black;
  color: white;
  padding: $spacer;
  margin: $spacer;
  font-family: monospace;
  font-size: 12px;
}
</style>
