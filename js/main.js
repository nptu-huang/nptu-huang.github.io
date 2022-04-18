let server = "";
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
        message: "jin1 tian1 ou1 yin4 ming2 tian1 fa1 cai2 hou4 tian1 jiu4 tui4 xiu1"
    }
    result = await fetch(server+"test", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(request)
    });
    
    let data = await result.json();
    let len = String(data['voice']).length
    png = "data:audio/wav;base64,"+String(data['voice']).substring(2,len-1)
    console.log(png);
    console.log(data['message']);

    document.querySelector('audio').src=png;
    
}
