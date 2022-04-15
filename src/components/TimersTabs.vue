<template>
  <nav>
    <ol ref="timerGroupsList" class="timer-groups-list">
      <li
        v-for="timerGroup of store.state.user.timerGroups"
        :key="timerGroup.uuid"
        :aria-label="'Go To Timer Group \'' + timerGroup.title + '\''"
        :class="(timerGroup.uuid == store.state.activeTimerGroupUUID ? 'selected' : '') + ' timer-groups-list-item draggable'"
        @click="
          (e) => {
            setActiveTimerGroup(e, timerGroup.uuid)
          }
        "
        @keyup.enter="
          (e) => {
            if (timerGroup.uuid === store.state.activeTimerGroupUUID) {
              return
            }
            setActiveTimerGroup(e, timerGroup.uuid)
          }
        "
      >
        <input
          maxlength="20"
          aria-label="Current Timer Group Title"
          class="timer-group-title-input"
          :readonly="!(timerGroup.uuid === store.state.activeTimerGroupUUID)"
          :value="timerGroup.title"
          :size="timerGroup.title.length + 1"
          @change="updateTimerGroupTitle"
        />
        <span :ref="timerGroup.uuid" class="underline"></span>
      </li>
      <li>
        <font-awesome-icon
          class="delete-icon timer-groups-list-item"
          aria-label="Create A New Timer Group"
          :icon="['fas', 'plus']"
          @click="createNewTimerGroup"
        />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { annotate } from 'rough-notation'
import Sortable from 'sortablejs'

export default defineComponent({
  data() {
    return {
      store: useStore(),
      currentUnderline: undefined as any,
    }
  },
  mounted() {
    this.$watch(
      () => this.store.state.activeTimerGroupUUID,
      () => {
        this.createUnderline()
      }
    )
    setTimeout(this.createUnderline, 500)
    Sortable.create(this.$refs.timerGroupsList, {
        delay: 100,
        delayOnTouchOnly: true,
        touchStartThreshold: 32,
        animation: 200,
        draggable: '.draggable',
        forceFallback: true,
        onChange: (event: { oldIndex: number, newIndex: number}) => {
          this.store.commit(
            'swapOrderOfTimerGroups',
            {
              targetIndex1: event.newIndex,
              targetIndex2: event.oldIndex,
            }
          )
        }
      }
    )
  },
  methods: {
    createUnderline() {
      if (this.currentUnderline) {
        this.currentUnderline.remove()
      }
      const target = (this.$refs[this.store.state.activeTimerGroupUUID as string] as Array<HTMLElement>)[0]
      this.currentUnderline = annotate(target, { type: 'underline' })
      this.currentUnderline.show()
    },
    setActiveTimerGroup(event: MouseEvent | KeyboardEvent, uuid: string) {
      const oldActiveTimerGroupUUID = this.store.state.activeTimerGroupUUID
      this.store.commit('setActiveTimerGroup', {
        timerGroupUUID: uuid,
      })
      if (oldActiveTimerGroupUUID !== this.store.state.activeTimerGroupUUID && event.target) {
        ;(event.target as HTMLElement).blur()
        this.createUnderline()
      }
    },
    createNewTimerGroup() {
      this.store.commit('createTimerGroup', {
        groupTitle: '',
      })
    },
    updateTimerGroupTitle(event: Event) {
      if (!(event.target && (event.target as HTMLTextAreaElement).value)) {
        return
      }
      this.store.commit('updateTimerGroupTitle', {
        targetUUID: this.store.state.activeTimerGroupUUID,
        newTitle: (event.target as HTMLTextAreaElement).value,
      })
    },
    updateTimerGroupsOrder(event: { moved: { oldIndex: number; newIndex: number } }) {
      this.store.commit('swapOrderOfTimerGroups', {
        targetIndex1: event.moved.oldIndex,
        targetIndex2: event.moved.newIndex,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: $spacer;
  .timer-groups-list {
    width: $app-width;
    max-width: 100%;
    padding: 0 $spacer * 2 $spacer * 2 $spacer * 2;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    list-style: none;
    .timer-groups-list-draggable-section {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .timer-groups-list-item {
      margin: $spacer * 2 $spacer;
      display: flex;
      align-items: center;
      position: relative;
      .timer-group-title-input {
        text-align: center;
        font-weight: $font-weight-bold;
      }
      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>
