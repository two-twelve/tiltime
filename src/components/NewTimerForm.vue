<template>
  <section class="new-timer-form-container">
    <form class="new-timer-form">
      <DatePicker 
        v-model="range"
        class="time-range"
        mode="dateTime"
        color="pink"
        is24hr is-range>
        <template #default="{ inputValue, inputEvents }">
          <input
            class="time-range-input"
            readonly
            :value="inputValue.start.split(' ')[0] + ' - ' + inputValue.end.split(' ')[0]"
            :size="inputValue.start.split(' ')[0].length + inputValue.end.split(' ')[0].length + 3"
            v-on="inputEvents.start"
          />
        </template>
      </DatePicker>
      <button 
        class="create-timer-button"
        type="button"
        @click="valid ? createTimer() : null">
        Create Timer
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css';

export default defineComponent({
  components: {
    DatePicker
  },
  data() { return {
    store: useStore(),
    from: new Date(),
    to: (() => { 
      const to = new Date()
      to.setHours(new Date().getHours() + 1) 
      return to
    })(),
    range: {
      start: new Date(),
      end: (() => { 
        const to = new Date()
        to.setHours(new Date().getHours() + 1) 
        return to
      })()
    }
  }},
  computed: {
    valid(): boolean {
      return this.from < this.to
    }
  },
  methods: {
    createTimer() {
      this.store.commit(
        'createTimer',
        {
          timerTitle: 'New Timer',
          from: this.range.start,
          to: this.range.end,
          groupUUID: this.store.state.activeTimerGroupUUID
        }
      )
    },
  }
})
</script>

<style lang="scss" scoped>
.new-timer-form-container {
  width: 100%;
  display:flex;
  justify-content: center;
  background: $background;
}
.new-timer-form {
  width: $app-width;
  max-width: 100%;
  padding: $spacer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.time-range {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.time-range-input, .create-timer-button {
  margin: $spacer;
  padding: $spacer $spacer*2;
  box-sizing: border-box;
  font-size: $font-size * 1.2;
}
.time-range-input {
  max-width: 100%;
  text-align: center;
  background: $colour-positive;
  border-radius: $spacer*3;
}
.create-timer-button {
  background: $colour-positive;
  border-radius: $spacer*3;
}
</style>
