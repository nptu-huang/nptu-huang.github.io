let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');
let testServer = "https://localhost:8000/";
let server = "https://172.29.7.115:8000/";
let taskItem = document.querySelectorAll('.list-group-item');
let buffer = {};
let exist = [], tatal = [];

let ver = "0431";


(function runMode(test = false) {
    if (test) {
        server = "https://localhost:8000/";
        return
    }
})();

function showAlert() {
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function () {
        alert.classList.remove('show');
    }, 1500);
}

function playRecord(content){
    
    document.querySelector('audio').src = buffer[String(content).toString()];
}


function setItem(strIn) {
    tatal = [];
    let listitem = document.querySelector('.list-group');
    let str = listitem;
    str = `
    <li class="list-group-item d-flex justify-content-between align-items-center task-item-o">
        <span class="task">${strIn}</span>
        <span class="task-item">
            <span><i class="bi bi-volume-up-fill" onclick=playRecord("${strIn}") ></i></span>
            <span><i class="bi bi-arrow-down" onclick=download("${strIn}") ></i></span>
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
        
        setItem(input.value,await playSend(input.value));
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
    buffer[Msg] = bUrl;
    round.classList.add('hide');
    document.querySelector('audio').src = bUrl;
    //new Audio(bUrl).play();
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