<template>
  <TimersTabs />
  <TimersList class="timers-tab" />
  <NewTimerForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimersTabs from '@/components/TimersTabs.vue'
import TimersList from '@/components/TimersList.vue'
import NewTimerForm from '@/components/NewTimerForm.vue'

export default defineComponent({
  components: {
    TimersTabs,
    TimersList,
    NewTimerForm,
  },
})
</script>

<style lang="scss" scoped>
.timers-tab {
  flex-grow: 1;
}
</style>
