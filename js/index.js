let start = 0;
import { hide, show } from "./load.js";
const hakka = {
    data() {
        return {
            items: [
                {
                    "chinese": "我的家人在過年時踏春",
                    "hakka": "吾屋下人在過年該下踏春",
                    "pinyin": "nga24 vug2 ha24 ngin11 cai55 go55 ngien11 ge55 ha55 tab5 cun24",
                    "voice": "",
                    "advice":""
                },
                {
                    "chinese": "爸爸說我們客家人最重要的兩件事",
                    "hakka": "阿爸講𠊎等客家人盡重要个兩件事",
                    "pinyin": "a24 ba24 gong31 ngai11 den24 hag2 ga24 ngin11 qin55 cung55 ieu55 ge55 liong31 kian55 sii55",
                    "voice": "",
                    "advice":""
                },

            ],
            shows: 0,
            mode: 0,
            menu: 0,
            audioDuration: "0:00",
            audioCurrentTime: "0:00",
            play: "true",
            reportHide:true,

            server: "http://server.nvda888.tk:9000",

        }

    },
    created() {
        this.items.forEach(item => {
            item['isClick'] = false;
        });
        this.items[this.shows]['isClick'] = true;
    },
    methods: {
        async errReport(){
            let request = {
                content:`中文字:\n${this.items[this.shows]['chinese']}\n客語字:\n${this.items[this.shows]['hakka']}\n拼音:\n${this.items[this.shows]['pinyin']}\n建議:\n${this.items[this.shows]['advice']}
                `
            }
            let result = await fetch(this.server + "/api/mail", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let text = await result.text();
            console.log(text)
            if(text.includes("success")){
                this.reportHide = true;
            }
            else {
                this.reportHide = false;
            }
        },
        tmove(e) {
            let bar = document.querySelector('.timebar .timebar-progress');
            let originWidth = parseInt(bar.style.width) || 0;

            let offsetX = (e.touches[0].clientX - start);
            start = e.touches[0].clientX;
            originWidth += offsetX;
            originWidth = originWidth ?? 1
            if (originWidth > 100) originWidth = 100;
            if (originWidth < 0) originWidth = 0;
            let audio = document.querySelector('audio');
            if (audio.src) {
                bar.setAttribute("style", `width:${originWidth}%;`);
                audio.currentTime = parseFloat(audio.duration * originWidth / 100);
            }
        },
        tend(e) {
        },
        tstart(e) {
            start = e.touches[0].clientX
        },
        barClick(e) {
            let dgx = e.offsetX;
            let bar = document.querySelector('.timebar .timebar-progress');
            let audio = document.querySelector('audio');
            if (audio.src) {
                bar.setAttribute("style", `width:${dgx}%;`);

                let duration = audio.duration;
                audio.currentTime = parseFloat(duration * dgx / 100);
            }

        },
        drag(e) {
            let dgx = e.offsetX;
            let bar = document.querySelector('.timebar .timebar-progress');
            let originWidth = parseInt(bar.style.width) || 0;

            originWidth += dgx;
            originWidth = originWidth ?? 1
            if (originWidth > 100) originWidth = 100;
            if (originWidth < 0) originWidth = 0;

            bar.setAttribute("style", `width:${originWidth}%;`);
        },
        dragEnd(e) {
            let dgx = e.offsetX;


            let bar = document.querySelector('.timebar .timebar-progress');
            let originWidth = parseInt(bar.style.width) || 0;


            originWidth += dgx;
            originWidth = originWidth ?? 1
            if (originWidth > 100) originWidth = 100;
            if (originWidth < 0) originWidth = 0;

            let audio = document.querySelector('audio');
            if (audio.src) {
                bar.setAttribute("style", `width:${originWidth}%;`);

                let duration = audio.duration;
                audio.currentTime = parseFloat(duration * originWidth / 100);
            }
        },
        getVoice() {
            var a = document.createElement('a');
            let audio = document.querySelector('audio');
            a.href = audio.src;
            a.download = "FileName.wav"
            document.body.appendChild(a);
            a.click();
            a.remove();
        },
        timeUpdate() {
            let audio = document.querySelector('audio');
            let currentTime = audio.currentTime;
            let duration = audio.duration;
            let rate = parseFloat(currentTime / duration);

            let min = parseInt(currentTime / 60);
            let sec = parseInt(currentTime % 60);
            this.audioCurrentTime = `${min}:${String(sec).padStart(2, "0")}`;
            let bar = document.querySelector('.timebar-progress');
            bar.setAttribute("style", `width:${rate * 100}%;`);
        },
        updatePaused(event) {
            this.videoElement = event.target;
            this.paused = event.target.paused;
            let audio = document.querySelector('audio');
            let duration = audio.duration;
            let min = parseInt(duration / 60);
            let sec = parseInt(duration % 60);
            this.audioDuration = `${min}:${String(sec).padStart(2, "0")}`;
        },
        async audioplay() {
            console.log('play')
            let audio = document.querySelector('audio');
            await audio.play();
        },
        pause() {
            console.log('pause')
            let audio = document.querySelector('audio');
            audio.pause();
        },
        itemClick(id) {
            this.shows = id;
            this.items.forEach(item => {
                item.isClick = false;
            });
            this.items[id].isClick = true;
            this.menu = !this.menu;
            let audio = document.querySelector('audio');
            audio.src = this.items[id].voice;
        },
        addItem() {
            this.items.push({
                "chinese": "",
                "hakka": "",
                "pinyin": "",
                "voice": ""
            })
            this.itemClick(this.items.length - 1);
        },
        async c2h(e) {
            e.preventDefault()
            let request = {
                message: this.items[this.shows]['chinese']
            }
            console.log(request)
            let result = await fetch(this.server + "/api/c2h", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://server.nvda888.tk,http://hcilab.nptu.edu.tw"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let data = await result.json();
            this.items[this.shows]['hakka'] = data['Msg'] ?? "";

        },
        async h2p(e) {
            e.preventDefault()
            let request = {
                message: this.items[this.shows]['hakka']
            }
            console.log(request)
            let result = await fetch(this.server + "/api/h2p", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let data = await result.json();
            this.items[this.shows]['pinyin'] = data['Msg'] ?? "";
        },
        async p2v(e,item) {
            e.preventDefault()
            let ft;
            if(this.mode){
                ft = '/p2vt';
            }
            else{
                ft = '/p2vf';
            }
            show();
            let request = {
                message: `${this.items[this.shows]['pinyin']}`
            }
            console.log(request)
            let result = await fetch(this.server + "/api/p2vf", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            hide();
            let data = await result.json();
            let len = String(data['Msg']).length;
            let wav = "data:audio/wav;base64," + String(data['Msg']).substring(2, len - 1);
            document.querySelector('audio').src = wav;
            item.voice = wav;
        },
        switchMode() {
            this.mode = !this.mode;
            console.log(this.mode)
        }
    },



}


Vue.createApp(hakka).mount('#app')








