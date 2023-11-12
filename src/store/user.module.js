import UserService from '@/services/user.service';
import EventBus from "@/common/EventBus";

export const user = {
    namespaced: true,
    state: {
        user: {},
    },
    actions: {
        setUser({commit}) {
            UserService.getUser().then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();


                    if (error.response.status !== 200) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        },
        followUser({commit}, followedUser) {
            UserService.followUser(followedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unfollowUser({commit}, unfollowedUser) {
            UserService.unfollowUser(unfollowedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        blockUser({commit}, blockedUser) {
            UserService.blockUser(blockedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unblockUser({commit}, unblockedUser) {
            UserService.unblockUser(unblockedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        dropChat({commit}, chat) {
            commit('dropChat', chat);
        },
        addChat({commit}, chat) {
            commit('addChat', chat);
        },
        updateUsername({commit}, username) {
            return UserService.updateUsername(username).then(
                response => {
                    if (response.status === 200) {
                        commit('setUsername', username);
                    }
                },
                error => {
                    throw error;
                }
            );
        },
        uploadImage({commit}, formData) {
            return UserService.uploadImage(formData).then(
                response => {
                    if (response.status === 200) {
                        UserService.getUser().then(
                            response => {
                                commit('setUser', response.data.data);
                            },
                            error => {
                                throw error;
                            }
                        );
                    } else {
                        throw response.data.message;
                    }
                },
                error => {
                    throw error;
                }
            );
        },
    },
    mutations: {
        setUser(state, resUser) {
            state.user = resUser;
            if (resUser.blockedUsers !== undefined) {
                state.user.blockedUsers = resUser.blockedUsers;
            } else {
                state.user.blockedUsers = [];
            }
            if (resUser.followedUsers !== undefined) {
                state.user.followedUsers = resUser.followedUsers;
            } else {
                state.user.followedUsers = [];
            }
            if (resUser.chats !== undefined) {
                state.user.chats = resUser.chats;
            } else {
                state.user.chats = [];
            }
        },
        setUsername(state, username) {
            state.user.username = username;
        },
        dropChat(state, chat) {
            state.user.chats.forEach((item, index) => {
                if (item.id === chat.id) {
                    state.user.chats.splice(index, 1);
                }
            });
        },
        addChat(state, chat) {
            let isExist = false;
            state.user.chats.some((item) => {
                    if (item.id === chat.id) {
                        isExist = true;
                    }
                }
            );
            if (!isExist) {
                state.user.chats.push(chat);
            }
        }
    }
}