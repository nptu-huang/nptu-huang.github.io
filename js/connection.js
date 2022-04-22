



async function runMode() {

    let testList = [
        "http://localhost:9000/",
        "http://172.29.7.115:9000/"
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
                    "Oringin-Trial":"AgsZXBMmT68D/5HAeob2jWomO2iJjHWnfY9vaAt0ZbPIZjMfDUr+e0eP3m061Zha0AYI3SyjO871Om1jBdhRsAMAAABweyJvcmlnaW4iOiJodHRwOi8vMTcyLjI5LjcuMTE1OjgwIiwiZmVhdHVyZSI6IlByaXZhdGVOZXR3b3JrQWNjZXNzTm9uU2VjdXJlQ29udGV4dHNBbGxvd2VkIiwiZXhwaXJ5IjoxNjY2MTM3NTk5fQ==",
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
            delay(1000);
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