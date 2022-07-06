const hakka = {
    data() {
        return {
            items: [
                {
                    "chinese": "種田就跟讀書一樣",
                    "hakka": "耕田同讀書",
                    "pinyin": "gang24 tien11 tung11 tug5 su24",
                    "voice": ""
                },
                {
                    "chinese": "爸爸說我們客家人最重要的兩件事",
                    "hakka": "阿爸講𠊎等客家人盡重要个兩件事",
                    "pinyin": "a24 ba24 gong31 ngai11 den24 hag2 ga24 ngin11 qin55 cung55 ieu55 ge55 liong31 kian55 sii55",
                    "voice": ""
                },
                
            ],
            shows:0,
            mode:0,
            menu:0,
            server:"",

        }

    },
    created() {
        this.items.forEach( item => {
            item['isClick']=false;
        });
        this.items[this.shows]['isClick']=true;
    },
    methods: {
        itemClick(id){
            this.shows=id;
            this.items.forEach( item =>{
                item.isClick =false;
            });
            this.items[id].isClick =true;
            this.menu = !this.menu;
        },
        addItem(){
            this.items.push({
                "chinese": "",
                "hakka": "",
                "pinyin": "",
                "voice": ""
            })
            this.itemClick(this.items.length-1);
        },
        async c2h(){

            let request = {
                message: this.items[shows]['chinese']
            }

            let result = await fetch(this.server+"/c2h", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin":"http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let data = await result.json();
            this.items[shows]['hakka'] = data['Msg']??"";

        },
        async h2p(){
           
            let request = {
                message: this.items[shows]['hakka']
            }

            let result = await fetch(this.server+"/h2p", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin":"http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let data = await result.json();
            this.items[shows]['pinyin'] = data['Msg']??"";
        },
        async p2v(){
            
            let request = {
                message: this.items[shows]['pinyin']
            }

            let result = await fetch(this.server+this.mode?'/f':'/t'+"/p2v", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin":"http://server.nvda888.tk"
                },
                redirect: 'follow',
                body: JSON.stringify(request)
            });
            let data = await result.json();
            document.querySelector('audio').src = data['Msg'];
        },
        switchMode(){
            this.mode=!this.mode;
            console.log(this.mode)
        }
    },






}


Vue.createApp(hakka).mount('#app')