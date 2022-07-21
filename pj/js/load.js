let content = "4545"
let isShow = false;
export let load = Vue.createApp({
    components: {
        
        "loadcircle": {
            template: `
            <div class="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`
        },
        "loadtext": {
            template: `<div>Loading</div>`
        }
    },
    created() {
        console.log('Hi load')
    },
    data() {
        return {
            show: isShow,
            content: "",
        }
    },

}).mount('#load');;



export function show(){
    load.$data.show=true;
}

export function hide(){
    load.$data.show=false;
}

