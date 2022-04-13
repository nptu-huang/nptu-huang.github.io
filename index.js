let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');
let testServer="https://localhost:8000/";
let server = "https://172.29.7.115:8000/";
let taskItem = document.querySelectorAll('.list-group-item');


function showAlert() {
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function () {
        alert.classList.remove('show');
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    //register add submit event
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (input.value == "")
            showAlert();
        else
            console.log('hi');
        let result = await play(input.value);
        console.log(result.message)
        input.value = "";
    });
    for(let i of taskItem){
        i.querySelector('.bi-volume-up-fill').addEventListener('click',async(e)=>{
            let cnotent = i.querySelector('.task').textContent;
            console.log('volume up');
            await play(cnotent);
        });
        i.querySelector('.bi-arrow-down').addEventListener('click',async(e)=>{
            let cnotent = i.querySelector('.task').textContent;
            console.log(cnotent);
            await download(cnotent);
            console.log(cnotent,"hi");
        });
    }
    

});



async function play(Msg) {
    let request = {
        message: Msg
    }

    let result = fetch(testServer, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    })

    result = await (await result).blob();
    new Audio(result).play();
    return result;
}

async function download(Msg) {
    let request = {
        message: Msg
    }
    let result = fetch(testServer, {
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