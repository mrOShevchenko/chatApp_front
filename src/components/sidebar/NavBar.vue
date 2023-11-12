<template>
  <div class="col-lg-12 hidden-sm text-center">
    <button @click="showChatList" class="btn"
            :class="showChatListState ? 'btn-outline-primary' : 'btn-outline-secondary'">
      <font-awesome-icon icon="message"/>
    </button>
    <button @click="showFollowedUsers" class="btn"
            :class="showFollowedUsersState ? 'btn-outline-primary' : 'btn-outline-secondary'">
      <font-awesome-icon icon="user-friends"/>
    </button>
    <button @click="showSettings" class="btn"
            :class="showSettingsState ? 'btn-outline-primary' : 'btn-outline-secondary'">
      <font-awesome-icon icon="user-gear"/>
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NavBar",
  methods: {
    showChatList() {
      this.$store.dispatch('ui/showChatList');
    },
    showFollowedUsers() {
      this.$store.dispatch('ui/showFollowedUsers');
    },
    showSettings() {
      this.$store.dispatch('ui/showSettings');
    },
  },
  computed: {
    ...mapState({
      showChatListState: state => state.ui.showChatList,
      showFollowedUsersState: state => state.ui.showFollowedUsers,
      showSettingsState: state => state.ui.showSettings,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>