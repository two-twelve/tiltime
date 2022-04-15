<template>
  <ul ref="timersList" class="timers-list">
    <TimerCard
      v-for="timer of store.getters.activeTimerGroup.timers"
      :key="timer.uuid"
      class="draggable"
      :title="timer.title"
      :from="timer.from"
      :to="timer.to"
      :uuid="timer.uuid"
    />
    <li
      v-if="
        store.getters.activeTimerGroup.timers.length == 0 &&
        (store.getters.activeTimerGroup.title === 'Welcome' || store.state.user.timerGroups.length == 1)
      "
      class="welcome-card"
    >
      <h1 class="welcome-title">🎉 Welcome to TilTi.me 🥳</h1>
      <p>Get started by making yourself a timer! You could:</p>
      <ul>
        <li>Keep track of your deadlines 📚</li>
        <li>See how long it is until your next birthday 🎂</li>
        <li>Count down to your next holiday 🏖️</li>
      </ul>
      <p>If you run into trouble, <a href="https://joshuarainbow.co.uk/about/">contact me.</a> {{ signoffEmoji }}</p>
    </li>
    <li
      v-if="store.state.activeTimerGroupUUID && store.getters.activeGroupDeletable"
      class="delete-group-button-container"
    >
      <button class="delete-group-button button" aria-label="Delete This Group" @click="deleteActiveTimerGroup">
        Delete This Group
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimerCard from '@/components/TimerCard.vue'
import Sortable from 'sortablejs'
import ColourTheme from '@/types/ColourTheme'

export default defineComponent({
  components: {
    TimerCard,
  },
  data() {
    return {
      store: useStore(),
    }
  },
  computed: {
    signoffEmoji(): string {
      switch (this.store.state.user.colourTheme) {
        case ColourTheme.dark:
          return '😎'
        case ColourTheme.pink:
          return '💖'
        case ColourTheme.green:
          return '🌿'
        default:
          return '👋'
      }
    },
  },
  mounted() {
    Sortable.create(this.$refs.timersList, {
      delay: 100,
      touchStartThreshold: 32,
      animation: 200,
      draggable: '.draggable',
      forceFallback: true,
      onChange: (event: { newIndex: number; oldIndex: number }) => {
        this.store.commit('swapOrderOfTimers', {
          targetTimerGroupUUID: this.store.state.activeTimerGroupUUID,
          targetIndex1: event.newIndex,
          targetIndex2: event.oldIndex,
        })
      },
    })
  },
  methods: {
    deleteActiveTimerGroup() {
      this.store.commit('deleteTimerGroup', {
        targetUUID: this.store.state.activeTimerGroupUUID,
      })
    },
    updateTimersOrder(event: { moved: { oldIndex: number; newIndex: number } }) {
      this.store.commit('swapOrderOfTimers', {
        targetTimerGroupUUID: this.store.state.activeTimerGroupUUID,
        targetIndex1: event.moved.oldIndex,
        targetIndex2: event.moved.newIndex,
      })
    },
  },
})
</script>

<style scoped lang="scss">
.timers-list {
  width: 100%;
  padding: 0 $spacer;
  padding-top: $spacer * 2;
  background: var(--colour-blue);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
  .timers-list-draggable-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
  }
  .delete-group-button-container {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    .delete-group-button {
      margin: $spacer * 2;
      background: var(--colour-red);
    }
  }
  .welcome-card {
    margin: $spacer * 2;
    padding: $spacer * 2 $spacer * 4;
    width: fit-content;
    max-width: 100%;
    background: var(--background);
    border-radius: $spacer * 4;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .welcome-title {
      margin: $spacer 0 $spacer * 2 0;
      font-size: $font-size-l;
      font-weight: $font-weight-bold;
      text-align: center;
    }
    p,
    ul {
      margin: $spacer 0;
    }
    ul {
      list-style: disc;
      li {
        margin-left: $spacer * 4;
      }
    }
    a {
      text-decoration: underline;
    }
  }
}
</style>
