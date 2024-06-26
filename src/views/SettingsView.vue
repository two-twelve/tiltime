<template>
  <nav>
    <router-link class="home-link" to="home">
      <font-awesome-icon class="back-icon" :icon="['fas', 'arrow-circle-left']" />
      Back To My Timers
    </router-link>
  </nav>
  <article class="settings">
    <h1 class="settings-title">
      <span ref="titleBrackets" class="title-brackets">
        Settings
        <font-awesome-icon class="icon" :icon="['fas', 'cogs']" />
      </span>
    </h1>
    <section class="settings-group colour-themes">
      <h2 class="section-title">Colour Themes</h2>
      <options-list class="options-list" :mode="'radio'" :options="colourThemeOptions" @change="setColourTheme" />
    </section>
    <section class="settings-group about">
      <h2 class="section-title">About</h2>
      <p>
        This app was built with 💖 by
        <a class="link" href="https://www.twotwelve.uk/">
          TwoTwelve<font-awesome-icon class="icon" :icon="['fas', 'globe-europe']" />
        </a>
      </p>
      <p>
        If you're having trouble using TilTi.me, send us an email at
        <a class="link" href="mailto:hi@twotwelve.uk"
          >hi@twotwelve.uk<font-awesome-icon class="icon" :icon="['fas', 'envelope']"
        /></a>
      </p>
    </section>
    <section class="settings-group delete-data">
      <h2 class="section-title">Your Data</h2>
      <p>
        Your timers are kept on your device only. For information on how we use your data, see our
        <a class="link" href="https://twotwelve.uk/legal/privacy/" target="_blank">Privacy Policy</a> and
        <a class="link" href="https://twotwelve.uk/legal/cookies/" target="_blank">Cookie Policy</a>.
      </p>
      <form class="delete-data-form">
        <button
          class="delete-data-button button"
          type="button"
          :aria-label="deleteUserDataConfirmState ? 'Confirm' : 'Delete Your Timers'"
          @click="deleteUserData"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'exclamation-circle']" />
          {{ deleteUserDataConfirmState ? 'Confirm' : 'Delete Your Timers' }}
        </button>
        <span v-if="deleteUserDataConfirmState" class="warning-message">
          Are you sure? All of your timers will be lost forever!</span
        >
      </form>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { annotate } from 'rough-notation'
import { useStore } from '@/store'
import ColourTheme from '@/types/ColourTheme'
import OptionsList from '@/components/OptionsList.vue'

export default defineComponent({
  components: {
    OptionsList,
  },
  data() {
    return {
      store: useStore(),
      deleteUserDataConfirmState: false,
    }
  },
  computed: {
    colourThemeOptions(): Array<{
      name: string
      value: any
      selected: boolean
    }> {
      return [
        {
          name: 'Light Theme',
          value: ColourTheme.light,
          selected: this.store.state.user.colourTheme === ColourTheme.light,
        },
        {
          name: 'Dark Theme',
          value: ColourTheme.dark,
          selected: this.store.state.user.colourTheme === ColourTheme.dark,
        },
        {
          name: 'Pink Theme',
          value: ColourTheme.pink,
          selected: this.store.state.user.colourTheme === ColourTheme.pink,
        },
        {
          name: 'Green Theme',
          value: ColourTheme.green,
          selected: this.store.state.user.colourTheme === ColourTheme.green,
        },
        {
          name: 'System Theme',
          value: ColourTheme.system,
          selected: this.store.state.user.colourTheme === ColourTheme.system,
        },
      ]
    },
  },
  mounted() {
    annotate(this.$refs.titleBrackets as HTMLElement, {
      type: 'bracket',
      brackets: ['left', 'right'],
    }).show()
  },
  methods: {
    deleteUserData() {
      if (this.deleteUserDataConfirmState) {
        this.store.commit('deleteUserData')
      }
      this.deleteUserDataConfirmState = !this.deleteUserDataConfirmState
    },
    setColourTheme(
      newColourThemeOptions: Array<{
        name: string
        value: any
        selected: boolean
      }>
    ) {
      this.store.commit('setColourTheme', {
        newColourTheme: newColourThemeOptions.filter((option) => option.selected)[0].value,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
nav {
  width: $app-width;
  max-width: 100%;
  padding: $spacer * 2 $spacer * 4;
  .home-link {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    .back-icon {
      margin-right: $spacer * 0.5;
    }
  }
}
.settings {
  width: $app-width * 0.75;
  max-width: 100%;
  padding: $spacer * 3;
  .settings-title {
    margin: $spacer * 1.5 0 $spacer * 6 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    .title-brackets {
      padding: 0 $spacer * 2;
    }
    .icon {
      margin-left: $spacer;
      margin-bottom: $spacer;
    }
  }
  .settings-group {
    margin-bottom: $spacer * 6;
    .section-title {
      margin-bottom: $spacer * 3;
      font-size: $font-size-l;
      font-weight: $font-weight-bold;
    }
    p {
      margin: $spacer;
    }
  }
  .colour-themes {
    .options-list {
      margin: $spacer * 2.5 $spacer;
    }
  }
  .delete-data {
    p {
      margin-bottom: $spacer * 4;
      @media (max-width: $app-width) {
        text-align: center;
      }
    }
    .delete-data-form {
      display: flex;
      align-items: center;
      .delete-data-button {
        margin: 0 $spacer;
        background: var(--colour-red-alt);
        color: var(--foreground-alt);
        flex-shrink: 0;
        .icon {
          margin-right: $spacer * 0.5;
          color: var(--foreground-alt);
        }
      }
      .warning-message {
        margin-left: $spacer;
      }
      @media (max-width: $app-width) {
        flex-direction: column;
        .warning-message {
          margin-left: 0;
          margin-top: $spacer * 2;
          text-align: center;
        }
      }
    }
  }
  .about,
  .delete-data {
    .link {
      text-decoration: underline;
      cursor: pointer;
      .icon {
        margin-left: $spacer * 0.5;
      }
    }
  }
}
</style>
