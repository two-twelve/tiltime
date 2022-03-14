<template>
  <form class="new-timer-form">
    <div class="dates">
      <div class="from">
        <label for="from">From:</label>
        <Datepicker ref="from" 
                    v-model="from" 
                    :format="'dd/MM/yyyy HH:mm'"
                    class="datepicker" 
                    @click="disableAuto('from')"></Datepicker>
      </div>
      <div class="to">
        <label for="to">To:</label>
        <Datepicker ref="to" 
                    v-model="to" 
                    :format="'dd/MM/yyyy HH:mm'"
                    class="datepicker" 
                    @click="disableAuto('to')"></Datepicker>
      </div>
    </div>
    <button type="button" @click="valid ? $emit('create',from,to) : null">Create Timer</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

export default defineComponent({
  components: {
    Datepicker
  },
  emits: ['create'],
  data() { return {
    store: useStore(),
    from: new Date(),
    to: new Date(),
    autoFrom: true,
    autoTo: true
  }},
  computed: {
    valid(): boolean {
      return this.from < this.to
    }
  },
  mounted() {
    setInterval(this.updateCurrentTime, 1000/30)
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
    updateCurrentTime() {
      const newTime = Date.now()
      if (this.autoFrom) {
        this.from = new Date(newTime)
      }
      if (this.autoTo || this.autoFrom > this.autoTo) {
        const to = new Date(newTime)
        to.setDate(to.getDate() + 1)
        this.to = to
      }
    },
    disableAuto(field: 'from' | 'to') {
      switch (field) {
        case 'from':
          this.autoFrom = false
          break
        case 'to':
          this.autoTo = false
          break
      }
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
  margin: $spacer*2 $spacer*4;
  border: 1px solid lightgrey;
  border-radius: 4px;
  text-align: center;
  white-space: pre;
  padding: $spacer;
  &:hover, &:focus {
    border-color: grey;
  }
}
.datepicker {
  max-width: 300px;
  margin: $spacer*0.5;
}
</style>
