let server = "http://localhost:9000/";
let buffer = {};
let loading = document.querySelectorAll('.load');
let loadText = document.querySelector('.load-text');

function playRecord(content) {

    document.querySelector('audio').src = buffer[content];
}

function download(Msg) {

    var a = document.createElement('a');
    a.href = buffer[Msg];
    a.download = `${Msg}.wav`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
async function delay(t)
{
    return new Promise( resolve=>{
        setTimeout(resolve,t);
    })
}

async function testFetch(){
    console.clear()
    let request = {
        message: "耕田同讀書"
    }
    let result = await fetch(server+"/test", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":true
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    });
    
    let data = await result.json();
    console.log(data)
    let len = String(data['voice']).length
    let wav = "data:audio/wav;base64,"+String(data['voice']).substring(2,len-1)
    console.log(wav);
    console.log(data['message']);

    document.querySelector('audio').src=wav;
    
}


async function test(){
    let result;
    result = await fetch("http://server.nvda888.tk:9000", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode:"cors",
        redirect: 'follow',
    });
    result = await result.text();
    console.log(result)
}