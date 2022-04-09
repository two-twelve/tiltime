<template>
  <ul class="timers-list">
    <VueDraggableNext
      class="timers-list-draggable-section"
      :list="store.getters.activeTimerGroup.timers"
      @change="updateTimersOrder"
    >
      <TimerCard
        v-for="timer of store.getters.activeTimerGroup.timers"
        :key="timer.uuid"
        :title="timer.title"
        :from="timer.from"
        :to="timer.to"
        :uuid="timer.uuid"
      />
    </VueDraggableNext>
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
      <p>
        If you run into trouble, make an issue on
        <a href="https://github.com/TheTeaCat/tiltime" target="_blank">GitHub</a>.
      </p>
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
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  components: {
    TimerCard,
    VueDraggableNext,
  },
  data() {
    return {
      store: useStore(),
    }
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
    width: 500px;
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
