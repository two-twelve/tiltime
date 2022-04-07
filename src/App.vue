<template>
  <main>
    <div class="header-container">
      <header class="header">
        <router-link to="home" tabindex="-1">
          <h1 ref="title" class="title">TilTi.me</h1>
        </router-link>
        <nav class="button-group">
          <font-awesome-icon
            v-if="installPromptEvent"
            class="download-icon"
            aria-label="Install TilTi.me As A Progressive Web App"
            :icon="['fas', 'download']"
            @click="installPWA"
          />
          <router-link to="settings">
            <font-awesome-icon
              class="user-icon"
              :icon="$router.currentRoute.value.name === 'settings' ? ['far', 'user-circle'] : ['fas', 'user-circle']"
            />
          </router-link>
        </nav>
      </header>
    </div>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { annotate } from 'rough-notation'
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default defineComponent({
  data() {
    return {
      installPromptEvent: null as any,
    }
  },
  mounted() {
    const target = this.$refs.title as HTMLElement
    const titleHighlight = annotate(target, {
      type: 'highlight',
      color: getComputedStyle(document.body).getPropertyValue('--colour-positive'),
      animate: false,
    })
    titleHighlight.show()
    const { needRefresh, updateServiceWorker } = useRegisterSW()
    if (needRefresh.value) {
      updateServiceWorker(false)
    }
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      this.installPromptEvent = event
    })
  },
  methods: {
    installPWA() {
      this.installPromptEvent.prompt()
      this.installPromptEvent.userChoice.then(() => {
        this.installPromptEvent = null
      })
    },
  },
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: var(--background);
}
.header-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.header {
  padding: $spacer * 2 $spacer * 2 0 $spacer * 2;
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
  margin: 0 $spacer * 2 $spacer $spacer * 2;
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
}
.button-group {
  display: flex;
  align-items: center;
  .download-icon,
  .user-icon {
    padding: $spacer * 2;
  }
  .download-icon {
    font-size: $font-size-l;
  }
  .user-icon {
    font-size: $font-size-xxl;
  }
}
</style>
