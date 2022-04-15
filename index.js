let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');
let testServer = "https://localhost:8000/";
let server = "https://172.29.7.115:8000/";
let taskItem = document.querySelectorAll('.list-group-item');
let buffer = {};
let exist = [], tatal = [];

let ver = "0431";

const hash = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

(async function runMode() {

    let testList = [
        "https://172.29.7.115:8000/",
        "https://localhost:8000/"
    ]
    for (let i of testList) {
        const abortController = new AbortController()
        const signal = abortController.signal
        console.log("Now is try to connect to ", i)
        let result, time;

        try {
            time = setTimeout(() => {
                abortController.abort();
            }, 3000);

            result = await fetch(i, {
                method: 'GET',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
            });
            clearTimeout(time)
            result = await result.text();
        }
        catch (err) {
            clearTimeout(time)
            console.log("Can't connect to Server", i);
            continue
        }
        if (result == "Hello") {
            console.log('Connect to Server ', i);
            server = i;
            return;
        }
    }

})();

function showAlert() {
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function () {
        alert.classList.remove('show');
    }, 1500);
}

function playRecord(content) {

    document.querySelector('audio').src = buffer[content];
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

document.addEventListener('DOMContentLoaded', () => {
    //register add submit event
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (input.value == "") {
            showAlert();
            return
        }
        console.log('hi');

        setItem(input.value, await playSend(input.value));
        input.value = "";

    });

});

async function playSend(Msg) {
    let round = document.querySelector('.load');
    round.classList.remove('hide');
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

    result = await (await result).blob();
    let bUrl = URL.createObjectURL(result);
    buffer[hash(Msg)] = bUrl;
    round.classList.add('hide');
    document.querySelector('audio').src = bUrl;
    return bUrl;
}

function download(Msg) {

    var a = document.createElement('a');
    a.href = buffer[Msg];
    a.download = `${Msg}.wav`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}