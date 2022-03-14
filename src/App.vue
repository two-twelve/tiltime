<template>
  <main>
    <TimersTabs @set-index="setTimerTabIndex"/>
    <TimersList class="timers-tab" />
    <NewTimerForm />
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
    }
  }
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.timers-tab {
  flex-grow: 1;
}
</style>
