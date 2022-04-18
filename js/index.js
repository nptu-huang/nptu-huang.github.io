import connect from './connection.js'
let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');

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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (input.value == "") {
            showAlert();
            return
        }

        setItem(input.value, await playSend(input.value));
        input.value = "";

    });

});

async function playSend(Msg) {
    loadText.innerHTML = "Loading"
    loading.forEach(i => { i.classList.remove('hide') });
    let request = {
        message: Msg
    }
    let result = fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    })
    result.then(res=>{
        console.log("res",res);
        res.headers.forEach(i=>{
            console.log("i",i)
        })
    })
    result = await (await result).blob();
    let bUrl = URL.createObjectURL(result);
    buffer[hash(Msg)] = bUrl;
    loading.forEach(i => { i.classList.add('hide') });
    document.querySelector('audio').src = bUrl;
    return bUrl;

}

function showAlert() {
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function () {
        alert.classList.remove('show');
    }, 1500);
}

function setItem(strIn) {
    tatal = [];
    let listitem = document.querySelector('.list-group');
    let str = listitem;
    str = `
    <li class="list-group-item d-flex justify-content-between align-items-center task-item-o">
        <span class="task">${strIn}</span>
        <span class="task-item">
            <span><i class="bi bi-volume-up-fill" onclick=playRecord("${hash(strIn)}") ></i></span>
            <span><i class="bi bi-arrow-down" onclick=download("${hash(strIn)}") ></i></span>
        </span>
    </li>
    `
    listitem.insertAdjacentHTML("beforeend", str);

}