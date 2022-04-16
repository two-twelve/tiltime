<template>
  <nav>
    <router-link class="home-link" to="home">
      <font-awesome-icon class="back-icon" :icon="['fas', 'arrow-circle-left']" />
      I Don't Want This Timer
    </router-link>
  </nav>
  <TimerCard class="timer" :title="title" :from="from" :to="to" />
  <div class="groups-list-container">
    <h1 class="title">Add This Timer To:</h1>
    <ul class="groups-list">
      <li
        v-for="timerGroup of store.state.user.timerGroups"
        :key="timerGroup.uuid"
        :aria-label="'Add This Timer To Timer Group \'' + timerGroup.title + '\''"
        class="groups-list-item focusable"
        tabindex="0"
        @click="
          () => {
            createTimer(timerGroup.uuid)
          }
        "
        @keyup.enter="
          () => {
            createTimer(timerGroup.uuid)
          }
        "
      >
        {{ timerGroup.title }}
        <font-awesome-icon class="icon" :icon="['fas', 'arrow-circle-right']" />
      </li>
    </ul>
  </div>
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
  computed: {
    title() {
      return <string>this.$router.currentRoute.value.query.title || 'New Timer'
    },
    from() {
      const from = Number(<string>this.$router.currentRoute.value.query.from)
      return from >= 0 ? new Date(from * 1000) : new Date()
    },
    to() {
      const from = Number(<string>this.$router.currentRoute.value.query.from)
      const to = Number(<string>this.$router.currentRoute.value.query.to)
      const altTo = new Date()
      altTo.setHours(altTo.getHours() + 1)
      return from < to || (!from && to) ? new Date(to * 1000) : altTo
    },
  },
  methods: {
    createTimer(groupUUID: string) {
      this.store.commit('createTimer', {
        timerTitle: this.title,
        from: this.from,
        to: this.to,
        groupUUID: groupUUID,
      })
      this.store.commit('setActiveTimerGroup', {
        timerGroupUUID: groupUUID,
      })
      this.$router.push('home')
    },
  },
})
</script>

<style lang="scss" scoped>
nav {
  width: $app-width;
  max-width: 100%;
  padding: $spacer * 2 $spacer * 4 $spacer * 3 $spacer * 4;
  .home-link {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    .back-icon {
      margin-right: $spacer * 0.5;
    }
  }
}
.timer {
  display: flex;
  justify-content: center;
  padding: $spacer * 4;
  width: 100%;
  list-style: none;
  background: var(--colour-blue);
}
.groups-list-container {
  padding: $spacer * 3 $spacer * 4;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: $app-width;
  max-width: 100%;
  .title {
    margin-right: $spacer;
    margin-bottom: $spacer;
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    text-align: center;
    flex-grow: 1;
  }
  .groups-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    .groups-list-item {
      display: flex;
      margin: $spacer;
      font-size: $font-size-m;
      .icon {
        margin-left: $spacer;
      }
    }
  }
}
</style>
