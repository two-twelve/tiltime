<template>
  <section class="new-timer-form-container">
    <form class="new-timer-form">
      <DatePicker
        v-model="to"
        :timezone="''"
        :min-date="new Date()"
        class="dateTime"
        mode="dateTime"
        color="pink"
        is24hr
      >
        <template #default="{ inputValue, inputEvents }">
          <input
            class="time-range-input"
            readonly
            :value="inputValue.toLocaleString()"
            :size="Math.max(inputValue.toLocaleString().length, 1)"
            v-on="inputEvents"
          />
        </template>
      </DatePicker>
      <button
        class="create-timer-button button"
        type="button"
        @click="createTimer"
      >
        Create Timer
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

export default defineComponent({
  components: {
    DatePicker,
  },
  data() {
    return {
      store: useStore(),
      from: new Date(),
      to: (() => {
        const to = new Date()
        to.setHours(new Date().getHours() + 1)
        to.setMinutes(0)
        to.setSeconds(0)
        return to
      })(),
    }
  },
  methods: {
    createTimer() {
      const from = new Date()
      this.store.commit('createTimer', {
        timerTitle: 'New Timer',
        from: from,
        to: this.to,
        groupUUID: this.store.state.activeTimerGroupUUID,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.new-timer-form-container {
  width: 100%;
  display: flex;
  justify-content: center;
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
.time-range-input,
.create-timer-button {
  font-size: $font-size * 1.2;
}
.time-range-input {
  margin: $spacer;
  padding: $spacer $spacer * 2;
  max-width: 100%;
  text-align: center;
  background: $colour-positive;
  border-radius: $spacer * 3;
}
.create-timer-button {
  background: $colour-positive;
  border-radius: $spacer * 3;
  text-align: center;
}
</style>
