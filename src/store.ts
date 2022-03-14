import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import ColourTheme from './types/ColourTheme'
import Timer from './types/Timer'
import TimerGroup from './types/timerGroup'
import User from './types/User'
import { v4 as uuidv4 } from "uuid";

export interface State {
  user: User,
  activeTimerGroupUUID: string | undefined
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      user: {
        timerGroups: [] as Array<TimerGroup>,
        colourTheme: 'system' as ColourTheme
      } as User,
      activeTimerGroupUUID: undefined,
    }
  },
  getters: {
    activeTimers(state: State): Array<Timer> {
      for (const timerGroup of state.user.timerGroups) {
        if (timerGroup.uuid === state.activeTimerGroupUUID) {
          return timerGroup.timers
        }
      }
      return []
    }
  },
  mutations: {
    createTimer(state: State, { timerTitle, from, to, groupUUID }: { timerTitle: string, from: Date, to: Date, groupUUID: string | undefined}): void {
      const newTimer: Timer = {
        uuid: uuidv4(),
        title: timerTitle,
        from: from,
        to: to
      }
      if (groupUUID) {
        for (let i = 0; i < state.user.timerGroups.length; i++) {
          if (state.user.timerGroups[i].uuid === groupUUID) {
            state.user.timerGroups[i].timers.push(newTimer)
            return
          }
        }
      }
      state.user.timerGroups.push({
        uuid: uuidv4(),
        title: "New Group",
        timers: [newTimer]
      })
      return
    },
    deleteTimer(state: State, { targetUUID } : { targetUUID: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers.splice(j,1)
            return
          }
        }
      }
    },
    updateTimerTitle(state: State, { targetUUID, newTitle } : { targetUUID: string, targetTitle: string, newTitle: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers[j].title = newTitle
            return
          }
        }
      }
    },
    createTimerGroup(state: State, { groupTitle }: { groupTitle: string }): void {
      const newTimerGroup: TimerGroup = {
        uuid: uuidv4(),
        title: groupTitle,
        timers: []
      }
      state.user.timerGroups.push(newTimerGroup)
    },
    deleteTimerGroup(state: State, { targetUUID } : { targetUUID: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        if (state.user.timerGroups[i].uuid == targetUUID) {
          state.user.timerGroups.splice(i,1)
          if (state.user.timerGroups[Math.max(i-1, 0)]) {
            store.commit(
              'setActiveTimerGroup',
              {
                timerGroupUUID: state.user.timerGroups[Math.max(i-1, 0)].uuid
              }
            )
          } else {
            store.commit(
              'setActiveTimerGroup',
              {
                timerGroupUUID: undefined
              }
            )
          }
          return
        }
      }
    },
    setActiveTimerGroup(state: State, { timerGroupUUID }: { timerGroupUUID: string }): void {
      state.activeTimerGroupUUID = timerGroupUUID
    }
  },
})

export function useStore() {
  return baseUseStore(key)
}