<template>
  <div v-if="showChatState && companionState !== {}">
    <!-- CHat Header -->
    <div class="chat-header clearfix">
      <chat-header/>
    </div>

    <!-- Chat History -->

    <chat-history/>

    <!-- Chat Input -->
    <div class="chat-message clearfix">
      <chat-input/>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import ChatHeader from "@/components/chat/ChatHeader.vue";
import ChatHistory from "@/components/chat/ChatHistory.vue";
import ChatInput from "@/components/chat/ChatInput.vue";

export default {
  name: "ChatComponent",
  components: {ChatInput, ChatHistory, ChatHeader},
  computed: {
    ...mapState({
      showChatState: state => state.ui.showChat,
      companionState: state => state.chat.companion,
    })
  },
}
</script>

<style lang="scss" scoped>

</style>