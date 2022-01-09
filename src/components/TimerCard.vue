<template>
  <section>
    <h1>{{ title }}</h1>
    <p>{{ remainingTime }} remaining until {{ to.toLocaleString() }}</p>
    <p>
      {{ percentageElapsed }}% elapsed, {{ percentageRemaining }}% remaining.
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as humanizeDuration from 'humanize-duration/humanize-duration.js'

export default defineComponent({
  props: {
    title: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  data() {
    return {
      currentTime: Date.now(),
    }
  },
  computed: {
    remainingTime(): number {
      return this.humanizeDuration(this.to.getTime() - this.currentTime)
    },
    percentageRemaining(): number {
      return Math.round(
        ((this.to.getTime() - this.currentTime) /
          (this.to.getTime() - this.from.getTime())) *
          100
      )
    },
    percentageElapsed(): number {
      return 100 - this.percentageRemaining
    },
  },
  mounted() {
    setInterval(this.updateCurrentTime, 1000)
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = Date.now()
    },
    humanizeDuration(time: number): number {
      return humanizeDuration(time, {
        round: true,
        units: [ 'h', 'm', 's' ],
        conjunction: " and ",
        serialComma: false
      })
    },
  },
})
</script>

<style lang="scss" scoped>
section {
  width: 600px;
  max-width: 100%;
}
</style>
