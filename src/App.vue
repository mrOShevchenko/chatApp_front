<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({'name': 'login'});
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logout();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>

<style></style>