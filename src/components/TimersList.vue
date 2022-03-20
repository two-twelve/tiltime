<template>
  <ul>
    <TimerCard
      v-for="timer of store.getters.activeTimers"
      :key="timer.uuid"
      :title="timer.title"
      :from="timer.from"
      :to="timer.to"
      :uuid="timer.uuid"
    />
    <li class="delete-group-button" v-if="store.state.activeTimerGroupUUID && store.getters.activeGroupDeletable" @click="deleteActiveTimerGroup">
      Delete Group
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
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.delete-group-button {
  margin: $spacer * 2;
  padding: $spacer $spacer*2;
  background: $pink;
  border-radius: $spacer * 4;
  flex-basis: 100%;
  font-size: $font-size * 1.2;
  text-align: center;
}
</style>