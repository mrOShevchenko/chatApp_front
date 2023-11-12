<template>
  <div class="input-group mb-0">
    <div class="input-group-prepend">
        <span @click="pushMessage(messageText, userState, chatIdState)"
              class="input-group-text"><i class="fa fa-send"></i></span>
    </div>
    <input
        v-model="messageText"
        @keydown.enter="pushMessage(messageText, userState, chatIdState)"
        type="text"
        class="form-control"
        placeholder="Enter text here..."
    >
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ChatInput",
  computed: {
    ...mapState({
      userState: state => state.user.user,
      chatIdState: state => state.chat.chatId,
    }),
  },
  data() {
    return {
      messageText: "",
    }
  },
  methods: {
    pushMessage(content, sender, chatId) {
      if (content.length > 0) {
        this.$socket.sendObj({
          "content": content,
          "chatId": chatId
        });
        this.$store.dispatch("chat/pushMessage", {
          content: content,
          sender: sender,
          chatId: chatId,
        });
        this.messageText = "";
      }
    },
  }

}
</script>

<style lang="scss" scoped>

</style>