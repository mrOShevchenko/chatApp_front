<template>
  <ul v-if="showChatListState" class="list-unstyled chat-list mt-2 mb-0">
    <li v-for="chat in chatsState" :key="chat.chatId">
      <user-list-item :user="getUserFromPrivateChat(userState, chat)"
                      :chat="chat"
                      :doOnClickItemBody="openChat"
                      :doOnClickTrashButton="deleteChatUser"
      />
    </li>
  </ul>
</template>

<script>
import {mapState} from "vuex";
import UserListItem from "@/components/sidebar/UserListItem.vue";

export default {
  name: "ChatsList",
  components: {UserListItem},
  computed: {
    ...mapState({
      chatsState: state => state.user.user.chats,
      userState: state => state.user.user,
      showChatListState: state => state.ui.showChatList,
    })
  },
  methods: {
    openChat(user, chat) {
      this.$store.dispatch('chat/setCompanion', user);
      this.$store.dispatch('chat/setChatId', chat.id);
      this.$store.dispatch('chat/getHistoryMessages', chat.id);
      this.$store.dispatch('ui/showChat');
      this.$store.dispatch('user/addChat', chat);
    },
    deleteChatUser(user, chat) {
      this.$store.dispatch('chat/deleteChat', chat.id);
      this.$store.dispatch('user/dropChat', chat);
      this.$store.dispatch('chat/clearChat');
      this.$store.dispatch('ui/clearChat');
    },
    getUserFromPrivateChat(user, chat) {
      let res = {};
      if (chat.type === 'private') {
        chat.users.forEach(item => {
          if (item.id !== user.id) {
            res = item;
          }
        });
      }
      return res;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>