import api from './api';

class DeviceService {
    addDevice(token) {
        return api.post(`/v1/device`, {
            type: "web",
            token: token
        });
    }
}
export default new DeviceService();