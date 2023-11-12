import api from './api';

class UserService {
    getUser() {
        return api.get('/v1/user');
    }

    searchUser(query) {
        return api.get(`/v1/search?q=${query}`);
    }

    followUser(userId) {
        return api.post(`/v1/user/${userId}/follow`);
    }

    unfollowUser(userId) {
        return api.delete(`/v1/user/${userId}/follow`);
    }

    blockUser(userId) {
        return api.post(`/v1/user/${userId}/block`);
    }

    unblockUser(userId) {
        return api.delete(`/v1/user/${userId}/block`);
    }

    updateUsername(username) {
        return api.put(`/v1/user/update-username`, {username});
    }

    updatePassword(oldPassword, newPassword) {
        return api.put(`/v1/user/update-password`, {oldPassword: oldPassword, newPassword: newPassword});
    }

    uploadImage(formData) {
        return api.post(`/v1/user/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }
}

export default new UserService();