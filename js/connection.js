



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
                    "Oringin-Trial":"AstmEHS3busYlixToMZbeRahTB50yq9A+raC40ZGJMK2Aimi+oHyR4fT5wuKHBsGywLlTh3GPCeK2KHOJjnSIAMAAAB3eyJvcmlnaW4iOiJodHRwOi8vZ2l0LnNoYXJrLXNtYWxsLmNvbTo4MCIsImZlYXR1cmUiOiJQcml2YXRlTmV0d29ya0FjY2Vzc05vblNlY3VyZUNvbnRleHRzQWxsb3dlZCIsImV4cGlyeSI6MTY2NjEzNzU5OX0=",
                    "Access-Control-Request-Private-Network": "true",
                    
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