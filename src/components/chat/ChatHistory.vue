<template>
  <div ref="chathistory" class="chat-history">
    <ul class="m-b-0">
      <li v-for="(message, index) in messagesState" :key="index" class="clearfix">
        <div class="message-data"
             :class="message.sender.id === userState.id ? 'text-left' : 'text-right'">
          <img v-if="message.sender.id === userState.id" :src="message.sender.image"
               alt="avatar">
          <span class="message-data-time">{{ formattedDate(message.createdAt) }}</span>
          <img v-if="message.sender.id !== userState.id"
               :src="chatState.companion.image"
               alt="avatar">
        </div>
        <div class="message"
             :class="message.sender.id === userState.id ? 'my-message float-left' : 'other-message float-right'">
          {{ message.content }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ChatHistory",
  computed: {
    ...mapState({
      userState: state => state.user.user,
      messagesState: state => state.chat.messages,
      chatState: state => state.chat,
    }),
  },
  watch: {
    messagesState: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    formattedDate(unixtime) {
      const date = new Date(unixtime * 1000);
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const dateFormatted = this.formatDate(date);
      const nowFormatted = this.formatDate(now);
      const yesterdayFormatted = this.formatDate(yesterday);

      let displayDate = '';
      if (dateFormatted === nowFormatted) {
        displayDate = 'Today';
      } else if (dateFormatted === yesterdayFormatted) {
        displayDate = 'Yesterday';
      } else {
        displayDate = date.toLocaleDateString();
      }

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes} ${ampm}, ${displayDate}`;
    },
    scrollToBottom() {
      const chatHistory = this.$refs.chathistory;
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  },
  mounted() {
    this.scrollToBottom();
    this.$options.sockets.onmessage = (data) => {
      let responseObj = {};
      responseObj = JSON.parse(data.data);

      if (responseObj.content.length > 0) {
        if (responseObj.type === 'text') {
          this.$store.dispatch('chat/pushMessage', {
            content: responseObj.content,
            sender: responseObj.sender,
            chatId: responseObj.chatId,
            createdAt: responseObj.createdAt,
          });
        }
      }
    };
  },

}
</script>

<style lang="scss" scoped>

</style>