<template>
  <ul>
    <li 
        v-for="[i, timerGroup] of timerGroups.entries()" 
        :key="timerGroup.uuid"
        @click="$emit('setIndex',i)">
      {{ timerGroup.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import TimerGroup from '@/types/timerGroup'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    timerGroups: { type: Array as PropType<Array<TimerGroup>>, required: true }
  },
  emits: ['setIndex']
})
</script>

<style lang="scss" scoped>
</style>
