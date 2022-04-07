<template>
  <li class="timer-container">
    <article ref="card" class="timer-card">
      <h1 ref="title" class="timer-title">
        <input
          v-model="localTitle"
          class="timer-title-input"
          maxlength="20"
          aria-label="Timer Title"
          :disabled="uuid === ''"
          @keyup="updateTimerTitle"
          @change="updateTimerTitle"
        />
        <div v-if="uuid !== ''" class="timer-buttons">
          <p v-if="justCopiedShareLink" class="copied-notif">Copied!</p>
          <font-awesome-icon
            class="share-icon"
            aria-label="Share This Timer"
            :icon="['fas', 'arrow-up']"
            :transform="{ rotate: 45 }"
            tabindex="0"
            @pointerdown="shareTimer"
            @keyup.enter="shareTimer"
          />
          <font-awesome-icon
            class="delete-icon"
            aria-label="Delete This Timer"
            :icon="['fas', 'times']"
            tabindex="0"
            @pointerdown="deleteTimer"
            @keyup.enter="deleteTimer"
          />
        </div>
      </h1>

      <div class="start-end-container">
        <p class="start-container">
          <font-awesome-icon class="icon" icon="hourglass-start" />
          {{ from.toLocaleString('en-GB', dateFormatOptions) }}
        </p>
        <p class="end-container">
          <font-awesome-icon class="icon" icon="hourglass-end" />
          {{ to.toLocaleString('en-GB', dateFormatOptions) }}
        </p>
      </div>

      <div class="countdown-container">
        <span class="countdown">{{ remainingTime }}</span>
      </div>

      <div class="progress-bar-container">
        <span class="progress-indicator-container">
          <div class="progress-indicator" :style="'flex-basis:' + (100 - percentageElapsed) + '%'">
            {{ percentageElapsed }}% elapsed
          </div>
        </span>
        <div class="progress-bar">
          <span class="elapsed-bar" :style="'flex-basis:' + percentageElapsed + '%'"> </span>
          <span class="remaining-bar"></span>
        </div>
      </div>
    </article>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { annotate } from 'rough-notation'

export default defineComponent({
  props: {
    uuid: { type: String, default: '' },
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
        minute: 'numeric' as 'numeric' | '2-digit',
      },
      store: useStore(),
      localTitle: this.title,
      crossOutAnnotation: undefined as any,
      crossedOutOnMount: false,
      justCopiedShareLink: false,
    }
  },
  computed: {
    remainingTime(): string {
      if (this.currentTime > this.from.getTime()) {
        return this.humanizeDuration(this.to.getTime() - this.currentTime)
      } else {
        return this.humanizeDuration(this.to.getTime() - this.from.getTime())
      }
    },
    percentageElapsed(): number {
      if (this.to.getTime() - this.currentTime <= 0) {
        return 100
      }
      if (this.currentTime < this.from.getTime()) {
        return 0
      }
      return Math.min(
        Math.round(
          (((this.currentTime - this.from.getTime()) / (this.to.getTime() - this.from.getTime())) * 100 +
            Number.EPSILON) *
            100
        ) / 100,
        99.99
      )
    },
    shareLink(): string {
      return (
        this.$router.currentRoute.value.fullPath +
        'add-timer?title=' +
        encodeURIComponent(this.title) +
        '&from=' +
        Math.ceil(this.from.getTime() / 1000) +
        '&to=' +
        Math.ceil(this.to.getTime() / 1000)
      )
    },
  },
  mounted() {
    if (new Date() > this.to) {
      this.crossedOutOnMount = true
      this.crossOutTimer()
    } else {
      setInterval(this.checkIfTimerShouldBeCrossedOut, 1000 / 30)
    }
    setInterval(this.updateCurrentTime, 1000 / 30)
    this.$watch(
      () =>
        this.store.state.user.timerGroups.filter(
          (timerGroup) => timerGroup.uuid === this.store.state.activeTimerGroupUUID
        )[0].timers.length,
      () => {
        if (this.crossOutAnnotation) {
          this.crossOutAnnotation.show
        }
      },
      { deep: true }
    )
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = Date.now()
    },
    checkIfTimerShouldBeCrossedOut() {
      if (!this.crossOutAnnotation && new Date() > this.to) {
        this.crossOutTimer()
      }
    },
    crossOutTimer() {
      const target = this.$refs.card as HTMLElement
      this.crossOutAnnotation = annotate(target, {
        type: 'crossed-off',
        color: getComputedStyle(document.body).getPropertyValue('--foreground'),
        animate: !this.crossedOutOnMount,
      })
      this.crossOutAnnotation.show()
    },
    deleteTimer() {
      if (this.uuid === '') {
        return
      }
      this.store.commit('deleteTimer', {
        targetUUID: this.uuid,
        targetTitle: this.title,
      })
    },
    updateTimerTitle() {
      if (this.uuid === '') {
        return
      }
      this.store.commit('updateTimerTitle', {
        targetUUID: this.uuid,
        targetTitle: this.title,
        newTitle: this.localTitle,
      })
    },
    shareTimer() {
      if ((navigator as any).canShare) {
        navigator.share({
          title: 'TilTi.me',
          text: this.title,
          url: this.shareLink,
        })
      } else {
        navigator.clipboard.writeText(window.location.host + this.shareLink).then(() => {
          this.justCopiedShareLink = true
          setTimeout(() => (this.justCopiedShareLink = false), 1000)
        })
      }
    },
    humanizeDuration(milliseconds: number): string {
      if (Math.ceil(milliseconds / 1000) <= 0) {
        return '0 hours,\n0 minutes\nand 0 seconds!'
      }

      let seconds = Math.ceil(milliseconds / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      seconds = seconds % 60
      minutes = minutes % 60
      hours = hours % 24

      if (days > 0) {
        return (
          days +
          (days > 1 ? ' days,' : ' day,') +
          '\n' +
          hours +
          (hours == 1 ? ' hour,' : ' hours,') +
          ' ' +
          minutes +
          (minutes == 1 ? ' minute,' : ' minutes') +
          '\n' +
          'and ' +
          seconds +
          (seconds == 1 ? ' second.' : ' seconds.')
        )
      } else {
        return (
          hours +
          (hours == 1 ? ' hour,' : ' hours,') +
          '\n' +
          minutes +
          (minutes == 1 ? ' minute,' : ' minutes') +
          '\n' +
          'and ' +
          seconds +
          (seconds == 1 ? ' second.' : ' seconds.')
        )
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.timer-container {
  margin: $spacer * 2;
  position: relative;
  .timer-card {
    padding: $spacer * 3;
    max-width: 400px;
    background: var(--background);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: $spacer * 5;
    .timer-title,
    .progress-bar-container {
      flex-basis: 100%;
    }
    .start-end-container,
    .countdown-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .timer-title {
      font-size: $font-size-xl;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .timer-title-input {
        padding: $spacer $spacer;
        width: 90%;
        font-size: inherit;
        font-weight: $font-weight-bold;
        text-align: left;
      }
      .timer-buttons {
        display: flex;
        align-items: center;
        padding: $spacer;
        position: relative;
        .copied-notif {
          position: absolute;
          font-size: $font-size-m;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--colour-positive);
          padding: $spacer $spacer * 2;
          border-radius: $spacer * 3;
        }
        .delete-icon,
        .share-icon {
          margin-left: $spacer;
          font-size: $font-size-l;
          width: 16px;
        }
      }
    }
    .start-container,
    .end-container {
      display: flex;
      align-items: center;
      .icon {
        margin-right: $spacer;
      }
    }
    .countdown-container {
      flex-grow: 1;
      text-align: right;
      .countdown {
        white-space: pre-line;
      }
    }
    .progress-bar-container {
      .progress-indicator-container {
        margin-top: $spacer;
        display: flex;
        flex-direction: row-reverse;
        .progress-indicator {
          font-size: $font-size-s;
          text-align: left;
          white-space: nowrap;
        }
      }
      .progress-bar {
        display: flex;
        .elapsed-bar,
        .remaining-bar {
          height: 5px;
        }
        .elapsed-bar {
          background: var(--colour-dark-positive);
          border-radius: 3px 0px 0px 3px;
        }
        .elapsed-bar[style='flex-basis: 100%;'] {
          border-radius: 3px;
        }
        .remaining-bar {
          background: var(--colour-dark-negative);
          border-radius: 0px 3px 3px 0px;
          flex-grow: 1;
        }
      }
    }
  }
}
</style>
