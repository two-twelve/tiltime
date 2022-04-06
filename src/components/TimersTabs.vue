<template>
  <nav>
    <ol>
      <li
        v-for="timerGroup of store.state.user.timerGroups"
        :key="timerGroup.uuid"
        :class="timerGroup.uuid == store.state.activeTimerGroupUUID ? 'selected' : ''"
        @click="
          (e) => {
            setActiveTimerGroup(e, timerGroup.uuid)
          }
        "
      >
        <input
          maxlength="20"
          :readonly="!(timerGroup.uuid === store.state.activeTimerGroupUUID)"
          :value="timerGroup.title"
          :size="timerGroup.title.length + 1"
          @change="updateTimerGroupTitle"
        />
        <span :ref="timerGroup.uuid" class="underline"></span>
      </li>
      <li>
        <font-awesome-icon class="delete-icon" :icon="['fas', 'plus']" @click="createNewTimerGroup" />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { annotate } from 'rough-notation'

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
    setActiveTimerGroup(event: MouseEvent, uuid: string) {
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
  },
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: $spacer;
  ol {
    padding: 0 $spacer * 2 $spacer * 2 $spacer * 2;
    width: $app-width;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    li {
      margin: $spacer * 2 $spacer;
      display: flex;
      align-items: center;
      position: relative;
      input {
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
