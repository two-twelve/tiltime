<template>
  <nav>
    <router-link class="home-link" to="home">
      <font-awesome-icon class="back-icon" :icon="['fas','arrow-circle-left']" />
      Back To My Timers
    </router-link>
  </nav>
  <article class="settings">
    <h1 class="settings-title">
      <span ref="titleBrackets" class="title-brackets">
        Settings
        <font-awesome-icon class="icon" :icon="['fas','cogs']" />
      </span>
    </h1>
    <section class="settings-group push-notifications">
      <h2 class="section-title">Push Notifications</h2>
      <options-list
        class="options-list"
        :mode="'checkbox'"
        :options="notificationOptions"
        @change="(newNotificationOptions)=>{ notificationOptions = newNotificationOptions }" />
    </section>
    <section class="settings-group colour-themes">
      <h2 class="section-title">Colour Themes</h2>
      <options-list
        class="options-list"
        :mode="'radio'"
        :options="colourThemeOptions"
        @change="(newColourThemeOptions)=>{ colourThemeOptions = newColourThemeOptions }" />
    </section>
    <section class="settings-group delete-data">
      <h2 class="section-title">Your Data</h2>
      <button class="delete-data-button button">
        <font-awesome-icon class="icon" :icon="['fas','exclamation-circle']" />
        Delete Your Data
      </button>
    </section>
    <section class="settings-group about">
      <h2 class="section-title">About</h2>
      <p>
        This app is open source! You can find it on 
        <a class="github-link" href="">
          GitHub<font-awesome-icon class="icon" :icon="['fab','github']" />
        </a>
      </p>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { annotate } from 'rough-notation';
import OptionsList from '@/components/OptionsList.vue'

export default defineComponent({
  components: {
    OptionsList
  },
  data() { return {
    notificationOptions: [
      { name: 'When a timer ends', value: 'end', selected: true },
      { name: 'When a timer has one hour remaining', value: '1h-before', selected: true },
      { name: 'The day before a timer ends', value: 'day-before', selected: false },
    ],
    colourThemeOptions: [
      { name: 'Light Theme', value: 'light', selected: false },
      { name: 'Dark Theme', value: 'dark', selected: false },
      { name: 'System Theme', value: 'system', selected: true },
    ]
  }},
  mounted() {
    annotate(
      this.$refs.titleBrackets as HTMLElement,
      {
        type: 'bracket',
        brackets: ['left', 'right']
      }
    ).show()
  }
})
</script>

<style lang="scss" scoped>
nav {
  width: $app-width;
  max-width: 100%;
  padding: $spacer*2 $spacer*4;
  .home-link {
    font-size: $font-size*1.2;
    font-weight: $font-weight-bold;
    .back-icon {
      margin-right: $spacer * 0.5;
    }
  }
}
.settings {
  width: $app-width * 0.75;
  max-width: 100%;
  padding: $spacer*3;
  .settings-title {
    margin: $spacer*1.5 0 $spacer*6 0;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size * 2;
    font-weight: $font-weight-bold;
    .title-brackets {
      padding: 0 $spacer*2; 
    }
    .icon {
      margin-left: $spacer;
      margin-bottom: $spacer;
    }
  }
  .settings-group {
    margin-bottom: $spacer*6;
    .section-title {
      margin-bottom: $spacer*3;
      font-size: $font-size * 1.4;
      font-weight: $font-weight-bold;
    }
  }
  .push-notifications, .colour-themes {
    .options-list {
      margin: $spacer*2.5 $spacer;
    }
  }
  .delete-data {
    .delete-data-button {
      margin: 0 $spacer;
      background: $dark-negative;
      color: $background;
      .icon {
        margin-right: $spacer * 0.5;
        color: $background;
      }
    }
  }
  .about {
    p {
      margin: $spacer;
    }
    .github-link {
      text-decoration: underline;
      .icon {
        margin-left: $spacer/2
      }
    }
  }
}
</style>