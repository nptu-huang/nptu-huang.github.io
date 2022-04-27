



async function runMode() {

    let testList = [
        "http://localhost:9001/",
        "http://163.24.242.210:9000/",
        "http://server.nvda888.tk:9000/"
    ]

    for (let i of testList) {
        const abortController = new AbortController()
        const signal = abortController.signal
        loadText.innerHTML += `Testing Server "${i}"<br>`;
        let result, time;
        await delay(300);
        try {
            time = setTimeout(() => {
                abortController.abort();
            }, 3000);

            result = await fetch(i, {
                method: 'GET',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',  
                },
                redirect: 'follow',
            });
            clearTimeout(time)
            result = await result.text();
            console.log("result :",result);
        }
        catch (err) {
            clearTimeout(time)
            loadText.innerHTML += `"${i}" is timeout<br>`;
            continue;
        }
        if (result == "Hello") {
            loadText.innerHTML += `"${i}" is connected<br>`;
            server = i;
            await delay(1000);
            loading.forEach(i => { i.classList.add('hide') });
            return server;
        }
    
    }
    await delay(5000)
    loadText.innerHTML = `Can not Connect to server`;
    await delay(10000)
    loading.forEach(i => { i.classList.add('hide') });
}

export default {
    runMode,
}