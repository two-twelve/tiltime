<template>
  <main>
    <div class="header-container">
      <header class="header">
        <h1 ref="title" class="title">TilTi.me</h1>
        <font-awesome-icon class="user-icon" :icon="['fas', 'user-circle']" />
        <TimersTabs />
      </header>
    </div>
    <TimersList class="timers-tab" />
    <NewTimerForm />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimersTabs from '@/components/TimersTabs.vue'
import TimersList from '@/components/TimersList.vue'
import NewTimerForm from '@/components/NewTimerForm.vue'
import { annotate } from 'rough-notation';

export default defineComponent({
  components: {
    TimersTabs,
    TimersList,
    NewTimerForm,
  },
  mounted() {
    setTimeout(
      function(){
        const target = this.$refs.title as HTMLElement
        const titleHighlight = annotate(target, { 
          type: 'highlight',
          color: '#d0e699',
          animate: false
        })
        titleHighlight.show()
      }.bind(this)
    )
  }
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: $blue;
}
.header-container {
  width:100%;
  background: $white;
  display: flex;
  justify-content: center;
}
.header {
  padding: $spacer * 2;
  width: $app-width;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.title {
  align-self: flex-start;
  margin: 0 $spacer*2 $spacer $spacer*2;
  font-size: $font-size * 2.5;
  font-weight: $font-weight-bold;
}
.user-icon {
  padding: $spacer*2;
  font-size: $font-size * 2.5;
}
.timers-tab {
  flex-grow: 1;
}
</style>
