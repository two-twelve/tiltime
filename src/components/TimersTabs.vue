<template>
  <nav>
    <ol>
      <li 
          v-for="timerGroup of store.state.user.timerGroups" 
          :key="timerGroup.uuid"
          :class="timerGroup.uuid == store.state.activeTimerGroupUUID ? 'selected' : ''"
          @click="setActiveTimerGroup(timerGroup.uuid)">
        <input :value="timerGroup.title" :size="timerGroup.title.length + 1" @change="updateTimerGroupTitle">
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
    },
    updateTimerGroupTitle(event: { target: { value: string }}) {
      this.store.commit(
        'updateTimerGroupTitle', 
        {
          targetUUID: this.store.state.activeTimerGroupUUID,
          newTitle: event.target.value
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  width: 100%;
  background: $white;
  padding: $spacer;
  margin-bottom: $spacer;
  font-size: $font-size * 1.2;
}
ol {
  width:$app-width;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
li {
  margin: $spacer*2 $spacer;
  display: flex;
  align-items: center;
  input {
    text-align: center;
    font-weight: $font-weight-bold;
  }
  &.selected>input {
    text-decoration: underline;
  }
}
</style>
