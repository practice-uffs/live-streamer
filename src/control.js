require('dotenv').config()
const WebSocket = require('ws');

function control() {
    const ws = new WebSocket(process.env.WEBSOCKET_SERVER);

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);

        if (data.action == "ping") {
            ws.send(JSON.stringify({
                action: "pong",
                uuid: "9833a966-fe3e-4c5d-94ab-f7e2a0670e04"
            }))
        }
    }
}

module.exports = control
