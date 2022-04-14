let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');
let testServer = "https://localhost:8000/";
let server = "https://172.29.7.115:8000/";
let taskItem = document.querySelectorAll('.list-group-item');
let listitem = document.querySelector('.list-group');
let ver="0219";


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

function setItem(str) {
    let str = listitem.innerHTML;
    str += `
    <li class="list-group-item d-flex justify-content-between align-items-center task-item-o">
        <span class="task">${str}</span>
        <span class="task-item">
            <span><i class="bi bi-volume-up-fill"></i></span>
            <span><i class="bi bi-arrow-down"></i></span>
        </span>
    </li>
    `

    for (let nodeP of listitem.querySelectorAll('.list-group-item')) {
        let node;
        node = nodeP.querySelector('.bi-volume-up-fill');
        //Regist click event of Check icon
        node.addEventListener('click', (e) => {
            let cnotent = i.querySelector('.task').textContent;
            console.log('volume up');
            await play(cnotent);
        });
        node = nodeP.querySelector('.bi-arrow-down');
        //Regist click event of Check icon
        node.addEventListener('click', (e) => {
            let cnotent = i.querySelector('.task').textContent;
            console.log(cnotent);
            await download(cnotent);
            console.log(cnotent, "hi", new Date());
        });
    }
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
        setItem(input.value);
        let result = await play(input.value);
        console.log(result.message)
        input.value = "";
    });
    for (let i of taskItem) {
        i.querySelector('.bi-volume-up-fill').addEventListener('click', async (e) => {
            let cnotent = i.querySelector('.task').textContent;
            console.log('volume up');
            await play(cnotent);
        });
        i.querySelector('.bi-arrow-down').addEventListener('click', async (e) => {
            let cnotent = i.querySelector('.task').textContent;
            console.log(cnotent);
            await download(cnotent);
            console.log(cnotent, "hi", new Date());
        });
    }


});


async function play(Msg) {
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
    new Audio(bUrl).play();
    return result;
}

async function download(Msg) {
    let request = {
        message: Msg
    }
    let result = fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    result = await (await result).blob();
    var url = window.URL.createObjectURL(result);
    var a = document.createElement('a');
    a.href = url;
    a.download = "test.wav";
    document.body.appendChild(a);
    a.click();
    a.remove();
}