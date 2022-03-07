<template>
  <li>
    <h1>
      <input v-model="localTitle" 
             @keyup="updateTimerTitle" 
             @change="updateTimerTitle"
             maxlength="20">
      <font-awesome-icon class="delete-icon" :icon="['fas', 'times']" @click="deleteTimer" />
    </h1>

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
      <span class="progress-indicator-container">
            <div class="progress-indicator"
                 :style="'flex-basis:'+(100-percentageElapsed)+'%'">
              {{ percentageElapsed }}% elapsed
            </div>
      </span>
      <div class="progress-bar">
        <span class="elapsed-bar" :style="'flex-basis:'+percentageElapsed+'%'">
        </span>
        <span class="remaining-bar"></span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    uuid: { type: String, required: true },
    title: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true }
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
      },
      store: useStore(),
      localTitle: this.title
    }
  },
  computed: {
    remainingTime(): string {
      return this.humanizeDuration(this.to.getTime() - this.currentTime)
    },
    percentageElapsed(): number {
      if (this.to.getTime() - this.currentTime <= 0) {
        return 100;
      }
      return Math.min(
        Math.round(
          (
            (this.currentTime - this.from.getTime()) 
            / (this.to.getTime() - this.from.getTime())
            * 100 
            + Number.EPSILON
          ) * 100
        ) / 100,
        99.99
      )
    }
  },
  mounted() {
    setInterval(this.updateCurrentTime, 1000/30)
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = Date.now()
    },
    humanizeDuration(milliseconds: number): string {
      if (Math.ceil(milliseconds / 1000) <= 0) {
        return "0 hours,\n0 minutes\nand 0 seconds!"
      }

      let seconds = Math.ceil(milliseconds / 1000);
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
    deleteTimer() {
      this.store.commit(
        'deleteTimer',
        {
          targetUUID: this.uuid,
          targetTitle: this.title
        }
      )
    },
    updateTimerTitle() {
      this.store.commit(
        'updateTimerTitle',
        {
          targetUUID: this.uuid,
          targetTitle: this.title,
          newTitle: this.localTitle
        }
      )
    }
  },
})
</script>

<style lang="scss" scoped>
li {
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

input {
  font-size: inherit
}
.delete-icon {
  float: right;
  padding-top: 5px;
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

.progress-bar {
  display:flex;
}
.progress-indicator-container {
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
}
.progress-indicator {
  font-size: 80%;
  white-space: nowrap;
}
.elapsed-bar, .remaining-bar {
  height: 5px;
}
.elapsed-bar {
  background: lime;
  border-radius: 3px 0px 0px 3px;
}
.remaining-bar {
  background: red;
  border-radius: 0px 3px 3px 0px;
  flex-grow:1;
}
</style>
