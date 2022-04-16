import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import ColourTheme from './types/ColourTheme'
import Timer from './types/Timer'
import TimerGroup from './types/TimerGroup'
import User from './types/User'
import { v4 as uuidv4 } from 'uuid'

var lastTimerGroupNameGenerated = ''
function getNewTimerGroupName() {
  const defaultTimerGroupNames = ['Holidays', 'Anniversaries', 'Events', 'Birthdays', 'Homework', 'Deadlines']
  var newTimerGroupName = defaultTimerGroupNames.filter(
    (timerGroupName) => timerGroupName !== lastTimerGroupNameGenerated
  )[Math.floor(Math.random() * (defaultTimerGroupNames.length - 1))]
  lastTimerGroupNameGenerated = newTimerGroupName
  return newTimerGroupName
}

export interface State {
  user: User
  activeTimerGroupUUID: string | undefined
}

const getDefaultState = () => {
  return {
    user: {
      timerGroups: [{ uuid: 'Welcome', title: 'Welcome', timers: [] }] as Array<TimerGroup>,
      colourTheme: ColourTheme.system as ColourTheme,
    } as User,
    activeTimerGroupUUID: 'Welcome',
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return getDefaultState()
  },
  getters: {
    activeTimerGroup(state: State): TimerGroup | undefined {
      for (const timerGroup of state.user.timerGroups) {
        if (timerGroup.uuid === state.activeTimerGroupUUID) {
          return timerGroup
        }
      }
      return undefined
    },
    activeGroupDeletable(state: State): boolean {
      return state.user.timerGroups.length > 1 && store.getters.activeTimerGroup.timers.length == 0
    },
  },
  mutations: {
    initialiseStore(state: State) {
      const localStore = localStorage.getItem('store')
      if (localStore) {
        const localState = JSON.parse(localStore)
        for (const timerGroup of localState.user.timerGroups) {
          for (const timer of timerGroup.timers) {
            timer.from = new Date(timer.from)
            timer.to = new Date(timer.to)
          }
        }
        this.replaceState(Object.assign(state, localState))
      }
    },
    createTimer(
      state: State,
      {
        timerTitle,
        from,
        to,
        groupUUID,
      }: {
        timerTitle: string
        from: Date
        to: Date
        groupUUID: string | undefined
      }
    ): void {
      const newTimer: Timer = {
        uuid: uuidv4(),
        title: timerTitle,
        from: from,
        to: to,
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
        title: getNewTimerGroupName(),
        timers: [newTimer],
      })
      return
    },
    deleteTimer(state: State, { targetUUID }: { targetUUID: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers.splice(j, 1)
            return
          }
        }
      }
    },
    updateTimerTitle(state: State, { targetUUID, newTitle }: { targetUUID: string; newTitle: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers[j].title = newTitle
            return
          }
        }
      }
    },
    updateTimerFrom(state: State, { targetUUID, newFrom }: { targetUUID: string; newFrom: Date }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers[j].from = newFrom
            return
          }
        }
      }
    },
    updateTimerTo(state: State, { targetUUID, newTo }: { targetUUID: string; newTo: Date }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        for (let j = 0; j < state.user.timerGroups[i].timers.length; j++) {
          if (state.user.timerGroups[i].timers[j].uuid === targetUUID) {
            state.user.timerGroups[i].timers[j].to = newTo
            return
          }
        }
      }
    },
    async createTimerGroup(state: State, { groupTitle }: { groupTitle: string }): Promise<void> {
      if (groupTitle === '') {
        groupTitle = getNewTimerGroupName()
      }
      const newTimerGroup: TimerGroup = {
        uuid: uuidv4(),
        title: groupTitle,
        timers: [],
      }
      await state.user.timerGroups.push(newTimerGroup)
      store.commit('setActiveTimerGroup', {
        timerGroupUUID: newTimerGroup.uuid,
      })
    },
    updateTimerGroupTitle(
      state: State,
      { targetUUID, newTitle }: { targetUUID: string; targetTitle: string; newTitle: string }
    ): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        if (state.user.timerGroups[i].uuid === targetUUID) {
          state.user.timerGroups[i].title = newTitle.length > 0 ? newTitle : getNewTimerGroupName()
          return
        }
      }
    },
    deleteTimerGroup(state: State, { targetUUID }: { targetUUID: string }): void {
      for (let i = 0; i < state.user.timerGroups.length; i++) {
        if (state.user.timerGroups[i].uuid == targetUUID) {
          state.user.timerGroups.splice(i, 1)
          if (state.user.timerGroups[Math.max(i - 1, 0)]) {
            store.commit('setActiveTimerGroup', {
              timerGroupUUID: state.user.timerGroups[Math.max(i - 1, 0)].uuid,
            })
          } else {
            store.commit('setActiveTimerGroup', {
              timerGroupUUID: undefined,
            })
          }
          return
        }
      }
    },
    setActiveTimerGroup(state: State, { timerGroupUUID }: { timerGroupUUID: string }): void {
      state.activeTimerGroupUUID = timerGroupUUID
    },
    swapOrderOfTimerGroups(
      state: State,
      { targetIndex1, targetIndex2 }: { targetIndex1: number; targetIndex2: number }
    ): void {
      const target1 = state.user.timerGroups[targetIndex1]
      state.user.timerGroups[targetIndex1] = state.user.timerGroups[targetIndex2]
      state.user.timerGroups[targetIndex2] = target1
    },
    swapOrderOfTimers(
      state: State,
      {
        targetTimerGroupUUID,
        targetIndex1,
        targetIndex2,
      }: { targetTimerGroupUUID: string; targetIndex1: number; targetIndex2: number }
    ): void {
      for (const timerGroup of state.user.timerGroups) {
        if (timerGroup.uuid === targetTimerGroupUUID) {
          const target1 = timerGroup.timers[targetIndex1]
          timerGroup.timers[targetIndex1] = timerGroup.timers[targetIndex2]
          timerGroup.timers[targetIndex2] = target1
          return
        }
      }
    },
    moveTimerToDifferentGroup(
      state: State,
      {
        sourceTimerGroupUUID,
        destinationTimerGroupUUID,
        targetTimerUUID
      }: { sourceTimerGroupUUID: string, destinationTimerGroupUUID: string, targetTimerUUID: string }
    ): void {
      var targetTimer
      var targetTimerIndex
      var sourceTimerGroup
      findTimerLoop:
        for (const timerGroup of state.user.timerGroups) {
          if (timerGroup.uuid === sourceTimerGroupUUID) {
            sourceTimerGroup = timerGroup
            for (var i = 0; i < timerGroup.timers.length; i++) {
              if (timerGroup.timers[i].uuid === targetTimerUUID) {
                targetTimer = timerGroup.timers[i]
                targetTimerIndex = i
                break findTimerLoop
              }
            }
          }
        }
      if (targetTimer && sourceTimerGroup && targetTimerIndex != undefined) {
        for (const timerGroup of state.user.timerGroups) {
          if (timerGroup.uuid === destinationTimerGroupUUID) {
            sourceTimerGroup.timers.splice(targetTimerIndex,1)
            timerGroup.timers.push(targetTimer)
          }
        }  
      }
    },
    deleteUserData(state: State): void {
      this.replaceState(Object.assign(state, getDefaultState()))
    },
    setColourTheme(state: State, { newColourTheme }: { newColourTheme: ColourTheme }): void {
      state.user.colourTheme = newColourTheme
    },
  },
})

store.subscribe((_: any, state: any) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export function useStore() {
  return baseUseStore(key)
}
