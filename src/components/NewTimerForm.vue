<template>
  <form class="new-timer-form">
    <div class="dates">
      <div class="from">
        <label for="from">From:</label>
        <Datepicker ref="from" 
                    v-model="from" 
                    :text-input="true"
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
                    :state="valid ? undefined : false"
                    @click="disableAuto('to')"></Datepicker>
      </div>
    </div>
    <button type="button" @click="valid ? $emit('create',from,to) : null">Create Timer</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

export default defineComponent({
  components: {
    Datepicker
  },
  emits: ['create'],
  data() { return {
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
    setInterval(this.updateCurrentTime, 1000)
  },
  methods: {
    updateCurrentTime() {
      const newTime = Date.now()
      if (this.autoFrom) {
        this.from = new Date(newTime)
      }
      if (this.autoTo) {
        const to = new Date(newTime)
        to.setDate(to.getDate() + 1)
        this.to = to
      }
    },
    disableAuto(field: 'from' | 'to') {
      console.log(field)
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
  width: 80px;
}
.datepicker {
  max-width: 300px;
  margin: $spacer;
}
</style>
