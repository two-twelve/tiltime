<template>
  <nav>
    <ol>
      <li 
          v-for="timerGroup of store.state.user.timerGroups" 
          :key="timerGroup.uuid"
          :class="timerGroup.uuid == store.state.activeTimerGroupUUID ? 'selected' : ''"
          @click="setActiveTimerGroup(timerGroup.uuid)">
        {{ timerGroup.title }}
      </li>
      <li>
        <font-awesome-icon 
          class="delete-icon" 
          :icon="['fas', 'plus']"
          @click="createNewTimerGroup" />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  data() { return {
    store: useStore()
  }},
  methods: {
    setActiveTimerGroup(uuid: string) {
      this.store.commit(
        'setActiveTimerGroup',
        {
          timerGroupUUID: uuid
        }
      )
    },
    createNewTimerGroup() {
      this.store.commit(
        'createTimerGroup',
        {
          groupTitle: 'New Group'
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
nav {
  width:$app-width;
  max-width: 100%;
  border-color: lightgrey;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 5px 5px;
  padding: $spacer;
  margin-bottom: $spacer;
}
ol {
  display: flex;
  flex-direction: row;
}
li {
  margin: $spacer $spacer*2;
  font-size: 125%;
  &.selected {
    text-decoration: underline;
  }
}
</style>