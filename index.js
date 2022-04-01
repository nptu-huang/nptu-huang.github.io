let form = document.getElementsByTagName('form')[0];
let input = document.getElementById('inputText');
let server = "http://127.0.0.1:3000/";



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
        let result = await sendRequest(input.value);
        console.log(result.message)
        input.value = "";
    });

});

async function sendRequest(Msg) {
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

    result = await (await result).json()
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
    a.download = "test.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
}