require('dotenv').config();
const Echo = require('laravel-echo');
Pusher =  require('pusher-js');

function control() {
    const echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        wsHost: process.env.WS_HOST,
        wsPort: process.env.WS_PORT,
        wssPort: process.env.WSS_PORT,
        cluster: process.env.PUSHER_APP_CLUSTER,
        forceTLS: false,
        disableStats: true,
    });

    echo.connector.pusher.connection.bind('connected', () => {
        console.log('\033[0;32mConnection opened\u001b[0m');
    });

    echo.connector.pusher.connection.bind('disconnected', () => {
        console.log('Connection closed');
    });

    echo.channel('streamer-channel')
    .listen('.example-event', (e) => {
        console.log(e);
    });
}

module.exports = control
