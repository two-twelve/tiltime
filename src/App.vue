<template>
  <main>
    <TimersTab :timers="store.state.user.timerGroups[0] ? store.state.user.timerGroups[0].timers : []" />
    <div @click="addMockTimer">Add another timer</div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimersTab from '@/components/TimersTab.vue'

export default defineComponent({
  components: {
    TimersTab
  },
  data() { return {
    store: useStore(),
  }},
  methods: {
    addMockTimer() {
      const groupUUID = this.store.state.user.timerGroups[0] ? this.store.state.user.timerGroups[0].uuid : undefined
      const from = new Date()
      const to = new Date()
      to.setDate(from.getDate() + 1)
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

<style lang="scss" scoped></style>
