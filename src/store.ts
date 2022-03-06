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
    // addTimer returns true if the timer was added to an existing group.
    addTimer(state: State, { groupTitle, timerTitle, from, to }: { groupTitle: string, timerTitle: string, from: Date, to: Date}): void {
      const newTimer: Timer = {
        uuid: uuidv4(),
        title: timerTitle,
        from: from,
        to: to
      }

      // Iterate over all of the user's timer groups until we see one with the right title, then add the new timer to it
      for (let i = 0; i++; i < state.user.timerGroups.length) {
        if (state.user.timerGroups[i].title === groupTitle) {
          state.user.timerGroups[i].timers.push(newTimer)
          return
        }
      }

      // If there isn't a timer group with that name, create one with the new timer in it
      state.user.timerGroups.push({
        title: groupTitle,
        timers: [newTimer]
      })
      return
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}