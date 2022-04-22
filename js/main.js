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
        message: "jin1 tian1 ou1 yin4 ming2 tian1 fa1 cai2 hou4 tian1 jiu4 tui4 xiu1"
    }
    result = await fetch(server, {
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


async function test(){
    let result;
    result = await fetch("http://172.29.7.115:9000", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Request-Private-Network": true,
            "Authentication": 'secret',
            "Oringin-Trial":"AgsZXBMmT68D/5HAeob2jWomO2iJjHWnfY9vaAt0ZbPIZjMfDUr+e0eP3m061Zha0AYI3SyjO871Om1jBdhRsAMAAABweyJvcmlnaW4iOiJodHRwOi8vMTcyLjI5LjcuMTE1OjgwIiwiZmVhdHVyZSI6IlByaXZhdGVOZXR3b3JrQWNjZXNzTm9uU2VjdXJlQ29udGV4dHNBbGxvd2VkIiwiZXhwaXJ5IjoxNjY2MTM3NTk5fQ==",

        },
        mode:"cors",
        redirect: 'follow',
    });
    result = await result.text();
    console.log(result)
}