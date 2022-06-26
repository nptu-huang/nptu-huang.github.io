import connect from './connection.js'
let form = document.querySelector('form');
let input = document.getElementById('inputText');
let input2 = document.getElementById('inputText2');
let tatal = [];


connect.runMode()

const hash = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


document.addEventListener('DOMContentLoaded', () => {
    //register add submit event
    document.querySelectorAll('form')[0].addEventListener('submit', async (e) => {
        e.preventDefault();
        if (input.value == "") {
            showAlert();
            return
        }
        let show ={
            input:"",
            hakkaStr:"",
            hakkaTone:""
        }
        let data = await playSend2(input.value)
        setItem(data);
        input2.value=data.hakkaTone;
    });
    
    document.querySelectorAll("#inputText")[0].addEventListener('input',async(e)=>{
        let data = await getHKTone(input.value)
        input2.value=data.hakkaTone;

    });

    document.querySelectorAll('form')[1].addEventListener('submit',async(e)=>{
        e.preventDefault();
        if (input2.value == "") {
            showAlert();
            return
        }
        let data = await playSend(input2.value)
        setItem2(data);

    });

});

async function getHKTone(Msg) {

    let request = {
        message: `${Msg}`
    }
    console.log(request.message)
    let result = await fetch(server+"hkTone", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":true
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    });
    
    let data = await result.json();

    console.log(data["hakkaTone"])

    return {
        input:Msg,
        hakkaStr:data["hakkaStr"]??"",
        hakkaTone:data["hakkaTone"]

    }

}

async function playSend(Msg) {
    loadText.innerHTML = "Loading";
    loading.forEach(i => { i.classList.remove('hide') });
    let request = {
        message: `${Msg}`
    }
    console.log(request.message)
    let result = await fetch(server+"hkTone", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":true
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    });
    
    let data = await result.json();
    
    let len = String(data['voice']).length;
    let wav = "data:audio/wav;base64,"+String(data['voice']).substring(2,len-1);
    document.querySelector('audio').src=wav;
    console.log(data["hakkaTone"])
    loading.forEach(i => { i.classList.add('hide') });
    return {
        input:Msg,
        hakkaStr:data["hakkaStr"]??"",
        hakkaTone:data["hakkaTone"]

    }

}

async function playSend2(Msg=""){
    loadText.innerHTML = "Loading";
    loading.forEach(i => { i.classList.remove('hide') });
    let request = {
        message: `${Msg}`
    }
    console.log(request.message)
    let result = await fetch(server, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":true
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    });
    
    let data = await result.json();
    
    let len = String(data['voice']).length;
    let wav = "data:audio/wav;base64,"+String(data['voice']).substring(2,len-1);
    document.querySelector('audio').src=wav;
    console.log(data["hakkaTone"])
    loading.forEach(i => { i.classList.add('hide') });
    return {
        input:Msg,
        hakkaStr:data["hakkaStr"]??"",
        hakkaTone:data["hakkaTone"]

    }
}

function showAlert() {
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function () {
        alert.classList.remove('show');
    }, 1500);
}

function setItem(item={input:"",hakkaStr:"",hakkaTone:""}) {
    tatal = [];
    let listitem = document.querySelector('.list-group');
    let str = listitem;
    str = `
    <li class="list-group-item d-flex justify-content-between align-items-center task-item-o">
        <div>
        <span class="task">中文字：${item.hakkaStr}</span><br>
        <!--<span class="task">客文字：${item.hakkaStr}</span><br>-->
        <span class="task">客文字：${item.input}</span><br>
        <span class="task">客語音標：${item.hakkaTone}</span>
        </div>
        <span class="task-item">
            <span><i class="bi bi-volume-up-fill" onclick=playRecord("${hash(item.input)}") ></i></span>
            <span><i class="bi bi-arrow-down" onclick=download("${hash(item.input)}") ></i></span>
        </span>
    </li>
    `
    listitem.insertAdjacentHTML("beforeend", str);

}
function setItem2(item={input:"",hakkaStr:"",hakkaTone:""}) {
    tatal = [];
    let listitem = document.querySelector('.list-group');
    let str = listitem;
    str = `
    <li class="list-group-item d-flex justify-content-between align-items-center task-item-o">
        <div>
        <span class="task">客語音標：${item.input}</span>
        </div>
        <span class="task-item">
            <span><i class="bi bi-volume-up-fill" onclick=playRecord("${hash(item.input)}") ></i></span>
            <span><i class="bi bi-arrow-down" onclick=download("${hash(item.input)}") ></i></span>
        </span>
    </li>
    `
    listitem.insertAdjacentHTML("beforeend", str);

}