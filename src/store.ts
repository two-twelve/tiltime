import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import ColourTheme from './types/ColourTheme'
import Timer from './types/Timer'
import TimerGroup from './types/timerGroup'
import User from './types/User'
import { v4 as uuidv4 } from "uuid";

export interface State {
  user: User
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      user: {
        timerGroups: [] as Array<TimerGroup>,
        colourTheme: 'system' as ColourTheme
      } as User,
    }
  },

  mutations: {
    addTimer(state: State, { groupTitle, timerTitle, from, to }: { groupTitle: string, timerTitle: string, from: Date, to: Date}): void {
      const newTimer: Timer = {
        uuid: uuidv4(),
        title: timerTitle,
        from: from,
        to: to
      }
      for (let i = 0; i++; i < state.user.timerGroups.length) {
        if (state.user.timerGroups[i].title === groupTitle) {
          state.user.timerGroups[i].timers.push(newTimer)
          return
        }
      }
      state.user.timerGroups.push({
        title: groupTitle,
        timers: [newTimer]
      })
      return
    },
    deleteTimer(state: State, { targetUUID, targetTitle } : { targetUUID: string, targetTitle: string }) {
      for (let i = 0; i++; i < state.user.timerGroups.length) {
        for (let j = 0; j++; j < state.user.timerGroups[i].timers.length) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID && state.user.timerGroups[i].timers[j].title === targetTitle) {
            state.user.timerGroups[i].timers.splice(j,1)
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
    deleteTimerGroup(state: State, { targetUUID, targetTitle } : { targetUUID: string, targetTitle: string }): void {
      for (let i = 0; i++; i < state.user.timerGroups.length) {
        if (state.user.timerGroups[i].uuid == targetUUID && state.user.timerGroups[i].title == targetTitle) {
          state.user.timerGroups.splice(i,1)
          return
        }
      }
    }
  },
})

export function useStore() {
  return baseUseStore(key)
}