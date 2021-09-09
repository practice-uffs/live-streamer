const OBSWebSocket   = require('obs-websocket-js');
const { connect } = require('puppeteer');

class obsConnection{
    constructor(address, password) {
        this.obs = new OBSWebSocket();
        this.address = address;
        this.password = password;
    }

    async init() {
        return this.connect().then(() => {
            this.obs.send('SetHeartbeat', {
                enable: true
            })

            //Streaming Events
            this.obs.on('StreamStarting', data => {
                console.log(data);
            });
    
            this.obs.on('StreamStarted', data => {
                console.log(data);
            });
    
            this.obs.on('StreamStopping', data => {
                console.log(data);
            });
    
            this.obs.on('StreamStopped', data => {
                console.log(data);
            });

            //Recording Events
            this.obs.on('RecordingStarting', data => {
                console.log(data);
            });
    
            this.obs.on('RecordingStarted', data => {
                console.log(data);
            });
    
            this.obs.on('RecordingStopping', data => {
                console.log(data);
            });
    
            this.obs.on('RecordingStopped', data => {
                console.log(data);
            });
    
            this.obs.on('RecordingPaused', data => {
                console.log(data);
            });
    
            this.obs.on('RecordingResumed', data => {
                console.log(data);
            });

            //Profile Events
            this.obs.on('ProfileChanged', data => {
                console.log(data);
            });
    
            this.obs.on('ProfileListChanged', data => {
                console.log(data);
            });


            this.obs.on('SwitchScenes', data => {
                console.log(`New Active Scene: ${data.sceneName}`);
            });

            this.obs.on('error', err => {
                console.error('socket error:', err);
            });

            this.obs.on('Heartbeat', data => {
                console.log(data);
            })
        })
    }

    async connect() {
        return this.obs.connect({ address: this.address, password: this.password }).then(() => {
            console.log(`Success! We're connected & authenticated.`);
        })
    }

    async setCurrentProfile(profileName) {
        this.obs.send('SetCurrentProfile',{
            "profile-name" : profileName
        });
    }

    async getCurrentProfile() {
        return this.obs.send('GetCurrentProfile');
    }

    async getProfileList() {
        return this.obs.send('ListProfiles');
    }

    async getSceneList() {
        return this.obs.send('GetSceneList');
    }

    async setCurrentScene(sceneName) {
        this.getSceneList().then(data => {
            let sceneList = data;
            if (sceneList.scenes.find(scenes => scenes.name == sceneName)) {
                if (sceneName == sceneList['current-scene']) {
                    console.log("This scene is already the current scene");
                    return;
                }
            
            this.obs.send('SetCurrentScene', {
                'scene-name': sceneName
            });
            return;
        } 
        console.log("This scene does not exist in the list of available scenes");
        }).catch(err => {
            console.log(err);
        })
    }

    async getStats() {
        return this.obs.send('GetStats');
    }

    async getRecordingStatus() {
        return this.obs.send('GetRecordingStatus');
    }

    async getStreamingStatus() {
        return this.obs.send('GetStreamingStatus');
    }

    async startRecording() {
        return this.obs.send('StartRecording');
    }

    async stopRecording() {
        this.obs.send('StopRecording').catch(err => {
            console.log(err);
        })
    }

    async startStreaming() {
        this.obs.send('StartStreaming').catch(err => {
            console.log(err);
        })
    }

    async stopStreaming() {
        this.obs.send('StopStreaming').catch(err => {
            console.log(err);
        })
    }

    async openProjector() {
        this.obs.send('OpenProjector');
    }

    async listOutputs() {
        return this.obs.send("ListOutputs");
    }

    async takeSourceScreenshot( embedPictureFormat=null, compressionQuality=-1, width=null, height=null) {
        return this.obs.send("TakeSourceScreenshot", {
            embedPictureFormat: embedPictureFormat,
            compressionQuality: compressionQuality,
            width: width,
            height: height
        });
        // Retorno do data.img contém o frame de preview codificado na base 64, apenas adicionar a um src de uma tag <img>
    }

    async setStreamSettings(platform, key, use_auth=false, username, password){
        let server;
        let service;
        let user;
        let pass;

        if(use_auth){
            user = username;
            pass = password;
        }

        switch(platform.toUpperCase()){
            case "TWITCH":
                server = "auto"
                service = "Twitch"
                break;
            case "YOUTUBE":
                server = "rtmps://a.rtmps.youtube.com:443/live2"
                service = 'YouTube - RTMPS';
                break;
            case "FACEBOOK":
                server = 'rtmps://rtmp-api.facebook.com:443/rtmp/';
                service = 'Facebook Live';
                break;
            default:
                server = platform;
        }

        return this.obs.send('SetStreamSettings', 
        {
            type: "rtmp_common",
            settings: {
                service: service,
                server: server,
                key: key,
                use_auth: use_auth,
                username: user,
                password: pass
            },
            save: true
        })
    }

    async getStreamSettings() {
        return this.obs.send('GetStreamSettings');
    }
}

module.exports = {
    obsConnection
}