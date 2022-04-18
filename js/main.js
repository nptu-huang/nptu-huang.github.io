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
    let request = {
        message: "jin1 tian1 ou1 yin4"
    };

    let result =await fetch(server+"download", {
        method: "GET",
        redirect: 'follow',
        
    });
    
    
}
