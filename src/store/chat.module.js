import ChatService from '@/services/chat.service';
export const chat = {
    namespaced: true,
    state: {
        chatId: 0,
        messages: [],
        companion: {},
    },
    actions: {
        setChatId({commit}, chatId) {
            commit('setChatId', chatId);
        },
        setCompanion({commit}, companion) {
            commit('setCompanion', companion);
        },
        clearChat({commit}) {
            commit('clearChat');
        },
        pushMessage({commit}, {content, sender, chatId}) {
            commit('pushMessage', {content, sender, chatId});
        },
        getHistoryMessages({commit}, chatId) {
            commit('getHistoryMessages', chatId);
        },
        deleteChat({commit}, chatId) {
            commit('deleteChat', chatId);
        }
    },
    mutations: {
        setChatId(state, chatId) {
            state.chatId = chatId
        },
        setCompanion(state, companion) {
            state.companion = companion;
        },
        clearChat(state) {
            state.chatId = 0;
            state.messages = [];
            state.companion = {};
        },
        pushMessage(state, {content, sender, chatId}) {
            const currentDate = new Date();
            const unixTimestamp = currentDate.getTime() / 1000;
            state.messages.push({
                content: content,
                sender: sender,
                senderId: sender.id,
                chatId: chatId,
                createdAt: unixTimestamp,
            });
        },
        getHistoryMessages(state, chatId) {
            ChatService.getMessages(chatId).then(
                response => {
                    state.messages = response.data.data.sort((a, b) => {
                        return a.id > b.id ? 1 : -1;
                    });
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        },
        deleteChat(state, chatId) {
            ChatService.deleteChat(chatId).then(
                response => {
                    console.log(response.data);
                    state.chatId = 0;
                    state.messages = [];
                    state.companion = {};
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        }
    }
}