<template>
  <section>
    <h1>{{ title }}</h1>

    <div class="start-end-container">
      <p class="start-container">
        <span class="start-time">
          {{ from.toLocaleDateString('en-GB', dateFormatOptions) }}
        </span>
      </p>
      <p class="end-container">
        <span id="end-time">
          {{ to.toLocaleDateString('en-GB', dateFormatOptions) }}
        </span>
      </p>
    </div>

    <div class="countdown-container">
      <span class="countdown"></span>
    </div>

    <div class="progress-bar-container">
      <span class="elapsed-bar">
        <span class="progress-indicator">0% elapsed</span>
      </span>
      <span class="remaining-bar"></span>
    </div>
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
      dateFormatOptions: {
        day: 'numeric' as 'numeric' | '2-digit',
        year: '2-digit' as 'numeric' | '2-digit',
        month: 'numeric' as 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
        hour: 'numeric' as 'numeric' | '2-digit',
        minute: 'numeric' as 'numeric' | '2-digit'
      }
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
        units: ['h', 'm', 's'],
        conjunction: ' and ',
        serialComma: false,
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
