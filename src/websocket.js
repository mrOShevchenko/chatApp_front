import TokenService from './services/token.service';
import store from "./store";

const websocket = {
    url: "ws://localhost:80/ws/chat?token=" + TokenService.getLocalAccessToken(),
    options: {
        store: store,
        format: "json",
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        mutations: {
            SOCKET_ONOPEN: 'socketOnOpen',
            SOCKET_ONCLOSE: 'socketOnClose',
            SOCKET_ONERROR: 'socketOnError',
            SOCKET_ONMESSAGE: 'socketOnMessage',
            SOCKET_RECONNECT: 'socketReconnect',
            SOCKET_RECONNECT_ERROR: 'socketReconnectError'
        },
    },
}
export default websocket;