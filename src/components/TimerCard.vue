<template>
  <section>
    <h1>{{ title }}</h1>

    <div class="start-end-container">
      <p class="start-container">
        <font-awesome-icon class="icon" icon="hourglass-start" />
        <span class="start-time">
          {{ from.toLocaleDateString('en-GB', dateFormatOptions) }}
        </span>
      </p>
      <p class="end-container">
        <font-awesome-icon class="icon" icon="hourglass-end" />
        <span id="end-time">
          {{ to.toLocaleDateString('en-GB', dateFormatOptions) }}
        </span>
      </p>
    </div>

    <div class="countdown-container">
      <span class="countdown">{{ remainingTime }}</span>
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
    remainingTime(): string {
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
    humanizeDuration(milliseconds: number): string {
      if (Math.floor(milliseconds / 1000) <= 0) {
        return "0 hours,\n0 minutes\nand 0 seconds!"
      }

      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      seconds = seconds % 60
      minutes = minutes % 60
      hours = hours % 24

      if (days > 0) {
        return days + (days > 1 ? " days," : " day,") + "\n"
             + hours + (hours == 1 ? " hour," : " hours,") + " "
             + minutes + (minutes == 1 ? " minute," : " minutes") + "\n"
             + "and " + seconds + (seconds == 1 ? " second." : " seconds.")
      } else {
        return hours + (hours == 1 ? " hour," : " hours,") + "\n"
             + minutes + (minutes == 1 ? " minute," : " minutes") + "\n"
             + "and " + seconds + (seconds == 1 ? " second." : " seconds.")
      }
    },
  },
})
</script>

<style lang="scss" scoped>
section {
  width: 600px;
  max-width: 100%;
  margin: 10px;
  padding: 20px 25px;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  border: 1px solid black;
}

h1, .progress-bar-container {
  flex-basis: 100%;
}
.start-end-container, .countdown-container {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.start-container, .end-container {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 0.5rem;
}

.countdown-container {
  text-align: right;
}
.countdown {
  white-space: pre-line;
}
</style>
