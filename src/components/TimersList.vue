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
      v-if="
        store.getters.activeTimerGroup.timers.length == 0 &&
        (store.getters.activeTimerGroup.title === 'Welcome' ||
          store.state.user.timerGroups.length == 1)
      "
      class="welcome-card"
    >
      <h1 class="welcome-title">🎉 Welcome to TilTi.me 🥳</h1>
      <p class="version-warning">
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'exclamation-triangle']"
        />
        This is an alpha build. Tilti.me is still in early development and your
        data may be lost.
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'exclamation-triangle']"
        />
      </p>
      <p>Get started by making yourself a timer! You could:</p>
      <ul>
        <li>Keep track of your deadlines 📚</li>
        <li>See how long it is until your next birthday 🎂</li>
        <li>Count down to your next holiday 🏖️</li>
      </ul>
      <p>
        If you run into trouble, make an issue on
        <a href="https://github.com/TheTeaCat/tiltime" target="_blank">GitHub</a
        >.
      </p>
    </li>
    <li
      v-if="
        store.state.activeTimerGroupUUID
      "
      class="delete-group-button-container"
    >
      <button
        class="create-timer-button button"
        @click="createTimer"
      >
        Create A Timer
      </button>
      <button
        v-if="store.getters.activeGroupDeletable"
        class="delete-group-button button"
        @click="deleteActiveTimerGroup"
      >
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
  data() {
    return {
      store: useStore(),
    }
  },
  methods: {
    createTimer() {
      this.store.commit('createTimer', {
        timerTitle: 'New Timer',
        from: new Date(),
        to: (() => { var to = new Date(); to.setHours(to.getHours()+1); return to })(),
        groupUUID: this.store.state.activeTimerGroupUUID,
      })
    },
    deleteActiveTimerGroup() {
      this.store.commit('deleteTimerGroup', {
        targetUUID: this.store.state.activeTimerGroupUUID,
      })
    },
  },
})
</script>

<style scoped lang="scss">
.timers-list {
  width: 100%;
  padding-top: $spacer;
  background: $colour-neutral;
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
.create-timer-button, .delete-group-button {
  margin: $spacer * 2;
}
.create-timer-button {
  background: $colour-positive;
}
.delete-group-button {
  background: $colour-negative;
}
.welcome-card {
  margin: $spacer * 2;
  padding: $spacer * 2 $spacer * 4;
  width: 500px;
  max-width: 100%;
  background: $background;
  border-radius: $spacer * 4;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .welcome-title {
    margin: $spacer 0 $spacer * 2 0;
    font-size: $font-size * 1.8;
    font-weight: $font-weight-bold;
    text-align: center;
  }
  .version-warning {
    color: $dark-negative;
    text-align: center;
    .icon {
      color: $dark-negative;
    }
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
</style>
