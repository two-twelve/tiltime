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
    <section class="settings-group">
      <h2 class="section-title">Push Notifications</h2>
      <p>Give me a push notification:</p>
      <ul>
        <li>
          <font-awesome-icon class="checkbox" :icon="['fas','check-circle']" />
          When a timer ends
        </li>
        <li>
          <font-awesome-icon class="checkbox" :icon="['fas','check-circle']" />
          When a timer has one hour remaining
        </li>
        <li>
          <font-awesome-icon class="checkbox" :icon="['far','circle']" />
          The day before a timer ends
        </li>
      </ul>
    </section>
    <section class="settings-group">
      <h2 class="section-title">Colour Themes</h2>
      <ul>
        <li>
          <font-awesome-icon class="checkbox" :icon="['far','circle']" />
          Light Theme
        </li>
        <li>
          <font-awesome-icon class="checkbox" :icon="['far','circle']" />
          Dark Theme
        </li>
        <li>
          <font-awesome-icon class="checkbox" :icon="['fas','dot-circle']" />
          System Theme
        </li>
      </ul>
    </section>
    <section class="settings-group">
      <h2 class="section-title">Your Data</h2>
      <button class="delete-data-button button">
        <font-awesome-icon class="icon" :icon="['fas','exclamation-circle']" />
        Delete Your Data
      </button>
    </section>
    <section class="about">
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

export default defineComponent({
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
  .settings-group, .about {
    margin-bottom: $spacer*6;
    .section-title {
      margin-bottom: $spacer*3;
      font-size: $font-size * 1.4;
      font-weight: $font-weight-bold;
    }
    p {
      margin: $spacer;
    }
    ul {
      margin: $spacer*2.5 $spacer;
      li {
        margin: $spacer $spacer*4;
        .checkbox {
          margin-right: $spacer * 1.5;
        }
      }
    }
    .delete-data-button {
      margin: 0 $spacer;
      background: $dark-negative;
      color: $background;
      .icon {
        margin-right: $spacer * 0.5;
        color: $background;
      }
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