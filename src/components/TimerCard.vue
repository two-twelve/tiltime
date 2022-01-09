<template>
  <section>
    <h1>{{ title }}</h1>
    <time>{{ remainingTime }} / {{ totalTime }}</time>
    <p>{{ percentageElapsed }}% elapsed, {{ percentageRemaining }}% remaining.</p>
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
  data(){return{
    currentTime: Date.now()
  }},
  computed: {
    totalTime(): number {
      return this.to.getTime() - this.from.getTime()
    },
    remainingTime(): number {
      return this.currentTime - this.from.getTime()
    },
    percentageRemaining(): number {
      return Math.round((this.remainingTime / this.totalTime) * 100)
    },
    percentageElapsed(): number {
      return 100 - this.percentageRemaining
    }
  },
  mounted() {
    setInterval(this.updateCurrentTime, 1000)
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = Date.now()
    }
  },
})
</script>

<style lang="scss" scoped></style>
