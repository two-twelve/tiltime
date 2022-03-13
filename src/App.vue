<template>
  <main>
    <TimersTab :timers="store.state.user.timerGroups[0] ? store.state.user.timerGroups[0].timers : []" />
    <Datepicker v-model="from"></Datepicker>
    <Datepicker v-model="to"></Datepicker>
    <div @click="addMockTimer">Add another timer</div>
    {{ store.state.user }}
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimersTab from '@/components/TimersTab.vue'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

export default defineComponent({
  components: {
    TimersTab,
    Datepicker
  },
  data() { return {
    store: useStore()
  }},
  computed: {
    from(): Date {
      return new Date()
    },
    to(): Date {
      const to = new Date()
      to.setDate(to.getDate() + 1)
      return to
    }
  },
  methods: {
    addMockTimer() {
      const groupUUID = this.store.state.user.timerGroups[0] ? this.store.state.user.timerGroups[0].uuid : undefined
      this.store.commit(
        'createTimer',
        {
          timerTitle: 'New Timer',
          from: this.from,
          to: this.to,
          groupTitle: 'Home',
          groupUUID: groupUUID
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped></style>
