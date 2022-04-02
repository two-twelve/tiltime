<template>
  <ul>
    <li
      v-for="[optionIndex, option] of options.entries()"
      :key="optionIndex"
      class="option"
      @click="
        () => {
          handleClick(optionIndex)
        }
      "
    >
      <font-awesome-icon class="icon" :icon="option.selected ? checkedIcon : ['far', 'circle']" />
      {{ option.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<{ name: string; value: any; selected: boolean }[]>,
      required: true,
    },
    mode: {
      type: String as PropType<'checkbox' | 'radio'>,
      required: true,
    },
  },
  emits: ['change'],
  computed: {
    checkedIcon(): Array<string> {
      var icon: Array<string>
      switch (this.mode) {
        case 'checkbox':
          icon = ['fas', 'check-circle']
          break
        case 'radio':
          icon = ['fas', 'dot-circle']
          break
      }
      return icon
    },
  },
  methods: {
    handleClick(targetIndex: number) {
      const newValues = this.options.map((option) => {
        return { ...option }
      })
      switch (this.mode) {
        case 'checkbox':
          newValues[targetIndex].selected = !newValues[targetIndex].selected
          break
        case 'radio':
          for (var i = 0; i < newValues.length; i++) {
            newValues[i].selected = false
          }
          newValues[targetIndex].selected = true
          break
      }
      this.$emit('change', newValues)
    },
  },
})
</script>

<style lang="scss" scoped>
.option {
  margin: $spacer $spacer * 4;
  .icon {
    margin-right: $spacer * 1.5;
  }
}
</style>
