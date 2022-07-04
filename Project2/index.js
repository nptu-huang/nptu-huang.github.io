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
            shows:0
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
        c2h(){

        },
        h2p(){

        },
        p2v(){
            
        }
    },






}


Vue.createApp(hakka).mount('#app')