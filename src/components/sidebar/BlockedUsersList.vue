<template>
  <ul v-if="showBlockedUsersState" class="list-unstyled chat-list mt-2 mb-0">
    <li>
      <div @click="showSettings()" class="clearfix row">
        <div class="col-lg-6">
          <font-awesome-icon icon="angle-left"/>
        </div>
        <div class="col-lg-6 text-right">Back</div>
      </div>
    </li>
    <li v-if="blockedUsersState.length === 0" class="clearfix not-react">
      Blacklist in empty
    </li>
    <li v-for="blockedUser in blockedUsersState" :key="blockedUser.id">
      <user-list-item :user="blockedUser"
                      :chat="{}"
                      :doOnClickItemBody="() => {}"
                      :doOnClickTrashButton="unblockUser"
                      :forceShowTrashButton="true"
      />
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex'
import UserListItem from "@/components/sidebar/UserListItem.vue";

export default {
  name: "BlockedUsersList",
  components: {UserListItem},
  methods: {
    showSettings() {
      this.$store.dispatch('ui/showSettings');
    },
    unblockUser(user, chat) {
      if (chat.chatId === undefined){
        this.$store.dispatch('user/unblockUser', user);
      }
    },
  },
  computed: {
    ...mapState({
      showBlockedUsersState: state => state.ui.showBlockedUsers,
      blockedUsersState: state => state.user.user.blockedUsers,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>