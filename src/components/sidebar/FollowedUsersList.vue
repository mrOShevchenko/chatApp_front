<template>
  <div class="input-group mb-0">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fa fa-search"></i></span>
      </div>
      <input v-model="searchQuery"
             @input="checkInputValue"
             @click="clearSidebar()"
             type="text" class="form-control" placeholder="Search...">
    </div>
  </div>

  <ul class="list-unstyled chat-list mt-2 mb-0">
    <li v-for="foundUser in foundUsersState" :key="foundUser.id">
      <user-list-item :user="foundUser"
                      :chat="{}"
                      :doOnClickItemBody="openChat"
                      :doOnClickTrashButton="() => {}"
      />
    </li>
    <li v-if="foundUsersState.length === 0 && searchQuery !== ''" class="clearfix not-react">
      Users not found
    </li>
  </ul>
</template>

<script>
import UserService from "@/services/user.service";
import ChatService from "@/services/chat.service";
import UserListItem from "@/components/sidebar/UserListItem.vue";
import {mapState} from "vuex";

export default {
  name: "SearchList",
  data: () => ({
    searchQuery: '',
  }),
  watch: {
    searchQuery(newVal) {
      this.$store.dispatch('ui/setSearchInput', newVal)
    },
    searchInputState(newVal) {
      this.searchQuery = newVal;
    },
  },
  methods: {
    clearSidebar() {
      this.searchQuery = '';
      this.$store.dispatch('ui/clearSidebar');
    },
    checkInputValue() {
      this.$store.dispatch('ui/setSearchInput', this.searchQuery);
      if (this.searchQuery.length !== 0) {
        this.searchUser(this.searchQuery);
      } else {
        this.$store.dispatch('ui/setFoundUsers', []);
      }
    },
    searchUser(query) {
      UserService.searchUser(query).then(
          response => {
            this.$store.dispatch("ui/setFoundUsers", response.data.data);
          },
          error => {
            this.$store.dispatch("ui/setFoundUsers", []);
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    openChat(user, chat) {
      this.clearSidebar();
      this.$store.dispatch('ui/showChat');
      this.$store.dispatch('chat/setCompanion', user);
      if (chat.chatId !== undefined) {
        this.$store.dispatch('chat/setChatId', chat.chatId)
        this.$store.dispatch('chat/getHistoryMessages', chat.chatId);
      } else {
        ChatService.getChatId(user.id).then(
            response => {
              this.$store.dispatch('chat/setChatId', response.data.data.id);
              this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
              this.$store.dispatch('user/setUser')
            },
            error => {
              if (error.response.status === 404) {
                ChatService.createChat(user.id).then(
                    response => {
                      this.$store.dispatch('chat/setChatId', response.data.data.id);
                      this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
                      this.$store.dispatch('user/setUser')
                    },
                    error => {
                      this.content =
                          (error.response && error.response.data && error.response.data.message) ||
                          error.message ||
                          error.toString();
                    }
                );
              }
              this.content =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    }
  },
  computed: {
    ...mapState({
      searchInputState: state => state.ui.searchInput,
      foundUsersState: state => state.ui.foundUsers,
    }),
  },
  components: {UserListItem},
}
</script>

<style lang="scss" scoped>

</style>