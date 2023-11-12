import api from './api';

class ChatService {
    getMessages(chatId) {
        return api.get(`/v1/chat/${chatId}/messages?limit=100`);
    }
    getChatId(userId) {
        return api.get(`/v1/user/${userId}/chat`);
    }
    createChat(userId) {
        return api.post(`/v1/user/${userId}/chat`);
    }
    deleteChat(chatId) {
        return api.delete(`/v1/chat/${chatId}`);
    }
}
export default new ChatService();