<template>
  <section>
    <h1>{{ title }}</h1>
    <p>{{ remainingTime }} remaining</p>
    <p>{{ elapsedTime }} / {{ totalTime }}</p>
    <p>
      {{ percentageElapsed }}% elapsed, {{ percentageRemaining }}% remaining.
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    totalTime(): number {
      return this.to.getTime() - this.from.getTime()
    },
    elapsedTime(): number {
      return this.currentTime - this.from.getTime()
    },
    remainingTime(): number {
      return this.to.getTime() - this.currentTime
    },
    percentageRemaining(): number {
      return Math.round((this.remainingTime / this.totalTime) * 100)
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
  },
})
</script>

<style lang="scss" scoped></style>
