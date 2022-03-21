<template>
  <ul class="timers-list">
    <TimerCard
      v-for="timer of store.getters.activeTimerGroup.timers"
      :key="timer.uuid"
      :title="timer.title"
      :from="timer.from"
      :to="timer.to"
      :uuid="timer.uuid"
    />
    <li
      v-if="store.getters.activeTimerGroup.timers.length == 0 && (store.getters.activeTimerGroup.title === 'Welcome' || store.state.user.timerGroups.length == 1)"
      class="welcome-card">
      <h1 class="welcome-title">🎉 Welcome to TilTi.me 🥳</h1>
      <p>
        Get started by making yourself a timer! You could:
      </p>
      <ul>
        <li>Keep track of your deadlines. 📚</li>
        <li>See how long it is until your next birthday. 🎂</li>
        <li>Check up on your next holiday. 🏖️</li>
      </ul>
      <p>
        If you run into trouble, make an issue on <a href="https://github.com/TheTeaCat/tiltime" target="_blank">GitHub</a>. 
      </p>
    </li>
    <li v-if="store.state.activeTimerGroupUUID && store.getters.activeGroupDeletable" class="delete-group-button-container">
      <button 
        class="delete-group-button"
        @click="deleteActiveTimerGroup">
        Delete This Group
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import TimerCard from '@/components/TimerCard.vue'

export default defineComponent({
  components: {
    TimerCard,
  },
  data() { return {
    store: useStore()
  }},
  methods: {
    deleteActiveTimerGroup() {
      this.store.commit(
        'deleteTimerGroup',
        {
          targetUUID: this.store.state.activeTimerGroupUUID
        }
      )
    }
  }
})
</script>

<style scoped lang="scss">
.timers-list {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.delete-group-button-container {
  flex-basis: 100%;
  display: flex;
  justify-content: center;
}
.delete-group-button {
  margin: $spacer * 2;
  padding: $spacer $spacer*2;
  background: $colour-negative;
  border-radius: $spacer * 4;
  font-size: $font-size * 1.2;
  text-align: center;
}
.welcome-card {
  margin: $spacer * 2;
  margin-bottom: 0;
  padding: $spacer*2 $spacer*4;
  width: 500px;
  max-width: 100%;
  background: $background;
  border-radius: $spacer * 4;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .welcome-title {
    margin: $spacer 0 $spacer*2 0;
    font-size: $font-size * 1.8;
    font-weight: $font-weight-bold;
    text-align: center;
  }
  p, ul {
    margin: $spacer 0;
  }
  ul {
    list-style: disc;
    li {
      margin-left: $spacer*4;
    }
  }
}
</style>