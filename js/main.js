let server = "http://localhost:9000/";
let buffer = {};
let loading = document.querySelectorAll('.load');
let loadText = document.querySelector('.load-text');

let mode = 't'

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

async function testFetch(Msg="阿爸講𠊎等客家人盡重要个兩件事"){
    console.clear()
    loadText.innerHTML = "Loading";
    loading.forEach(i => { i.classList.remove('hide') });
    let request = {
        message: Msg
    }
    let result = await fetch(server+'test', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"http://server.nvda888.tk"
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


async function test(url = "",str=""){
    console.clear()
    loadText.innerHTML = "Loading";
    loading.forEach(i => { i.classList.remove('hide') });
    let request = {
        message: str
    }
    let result = await fetch(server+url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"http://server.nvda888.tk"
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
        input:str,
        hakkaStr:data["hakkaStr"]??"",
        hakkaTone:data["hakkaTone"]

    }
}