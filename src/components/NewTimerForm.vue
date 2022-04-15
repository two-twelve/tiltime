<template>
  <section class="new-timer-form-container">
    <form class="new-timer-form">
      <div class="datetime-inputs-container">
        <DatePicker v-model="from" :timezone="''" :max-date="to" class="dateTime" mode="dateTime" is24hr dark>
          <template #default="{ inputValue, inputEvents }">
            <div class="datetime-input-container">
              <font-awesome-icon class="icon" icon="hourglass-start" />
              <input
                class="datetime-input"
                readonly
                :value="inputValue.toLocaleString()"
                aria-label="Timer End Datetime"
                v-on="inputEvents"
              />
            </div>
          </template>
        </DatePicker>
        <DatePicker
          v-model="to"
          :timezone="''"
          :min-date="new Date()"
          class="dateTime"
          mode="dateTime"
          is24hr
        >
          <template #default="{ inputValue, inputEvents }">
            <div class="datetime-input-container">
              <font-awesome-icon class="icon" icon="hourglass-end" />
              <input
                class="datetime-input"
                readonly
                :value="inputValue.toLocaleString()"
                aria-label="Timer End Datetime"
                v-on="inputEvents"
              />
            </div>
          </template>
        </DatePicker>
      </div>
      <button
        class="create-timer-button button"
        type="button"
        aria-label="Create Timer"
        tabindex="0"
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
  mounted() {
    this.$watch(
      () => this.to,
      () => {
        if (this.from > this.to) {
          this.from = this.to
        }
      }
    )
  },
  methods: {
    createTimer() {
      this.store.commit('createTimer', {
        timerTitle: 'New Timer',
        from: this.from,
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.create-timer-button {
  font-size: $font-size-m;
}
.datetime-inputs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.datetime-input-container {
  margin: $spacer;
  display: flex;
  align-items: center;
  max-width: 100%;
  text-align: center;
  .datetime-input {
    margin-left: $spacer;
    padding: $spacer $spacer * 2;
    width: 16ch;
    text-align: center;
    border-radius: $spacer * 3;
    background: var(--colour-green);
  }
}
.create-timer-button {
  background: var(--colour-green);
  border-radius: $spacer * 3;
  text-align: center;
}
</style>
