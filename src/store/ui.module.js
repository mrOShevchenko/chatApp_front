export const ui = {
    namespaced: true,
    state: {
        showChatList: false,
        showFollowedUsers: false,
        showBlockedUsers: false,
        showSettings: false,
        showChat: false,
        showProfile: false,
        showSecurity: false,
        showModal: false,
        modalTitle: '',
        modalMessage: '',
        searchInput: '',
        foundUsers: [],
    },
    actions: {
        clearSidebar({commit}) {
            commit('clearSidebar');
        },
        clearChat({commit}) {
            commit('clearChat');
        },
        showChatList({commit}) {
            commit('clearSidebar');
            commit('openChatList');
        },
        showFollowedUsers({commit}) {
            commit('clearSidebar');
            commit('openFollowedUsers');
        },
        showSettings({commit}) {
            commit('clearSidebar');
            commit('openSettings');
        },
        showBlockedUsers({commit}) {
            commit('clearSidebar');
            commit('openBlockedUsers');
        },
        showChat({commit}) {
            commit('openChat');
        },
        showProfile({commit}) {
            commit('openProfile');
        },
        showSecurity: ({commit}) => {
            commit('openSecurity');
        },
        setSearchInput: ({commit}, input) => {
            commit('setSearchInput', input);
        },
        setFoundUsers: ({commit}, users) => {
            commit('setFoundUsers', users);
        },
        showModal: ({commit}, {title, message}) => {
            commit('showModal', {title, message});
        },
        clearModal: ({commit}) => {
            commit('clearModal');
        }
    },
    mutations: {
        resetState(state) {
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showSettings = false;
            state.showChat = false;
            state.showProfile = false;
            state.showSecurity = false;
            state.showModal = false;
            state.modalTitle = '';
            state.modalMessage = '';
            state.searchInput = '';
            state.foundUsers = [];
        },
        clearSidebar(state) {
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showSettings = false;
            state.searchInput = '';
            state.foundUsers = [];
        },
        clearChat(state) {
            state.showChat = false;
        },
        clearModal(state) {
            state.modalTitle = '';
            state.modalMessage = '';
            state.showModal = false;
        },
        openSettings(state) {
            state.showSettings = true;
        },
        openChatList(state) {
            state.showChatList = true;
        },
        openChat(state) {
            state.showSecurity = false;
            state.showProfile = false;
            state.showChat = true;
        },
        openProfile(state) {
            state.showChat = false;
            state.showSecurity = false;
            state.showProfile = true;
        },
        openSecurity(state) {
            state.showChat = false;
            state.showProfile = false;
            state.showSecurity = true;
        },
        openFollowedUsers(state) {
            state.showFollowedUsers = true;
        },
        openBlockedUsers(state) {
            state.showBlockedUsers = true;
        },
        setSearchInput(state, input) {
            state.searchInput = input;
        },
        setFoundUsers(state, users) {
            state.foundUsers = users;
        },
        showModal(state, {title, message}) {
            state.modalTitle = title;
            state.modalMessage = message;
            state.showModal = true;
        }
    }
}