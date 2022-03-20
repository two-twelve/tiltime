<template>
  <form class="new-timer-form">
    <div class="dates">
      <div class="from">
        <label for="from">From:</label>
        <DatePicker v-model="from" mode="dateTime" is24hr>
          <template #default="{ inputValue, inputEvents }">
            <input
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </DatePicker>
      </div>
      <div class="to">
        <label for="to">To:</label>
        <DatePicker v-model="to" mode="dateTime" is24hr>
          <template #default="{ inputValue, inputEvents }">
            <input
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </DatePicker>
      </div>
    </div>
    <button type="button" @click="valid ? createTimer() : null">Create Timer</button>
  </form>
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
    })()
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
          from: this.from,
          to: this.to,
          groupUUID: this.store.state.activeTimerGroupUUID
        }
      )
    },
  }
})
</script>

<style lang="scss" scoped>
.new-timer-form {
  width: $app-width;
  max-width: 100%;
  padding: $spacer;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-color: lightgrey;
  border-style: solid;
  border-width: 1px 1px 0px 1px;
  border-radius: 5px 5px 0px 0px;
}
.dates {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.from, .to {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
label {
  width: 40px;
  margin: $spacer;
  text-align: right;
}
button {
  padding: $spacer;
}
</style>
