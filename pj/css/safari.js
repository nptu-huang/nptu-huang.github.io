function safariHacks() {
    let windowsVH = window.innerHeight / 100;
    document.querySelector('#app').style.setProperty('--vh', windowsVH + 'px');
    window.addEventListener('resize', function () {
        document.querySelector('#app').style.setProperty('--vh', windowsVH + 'px');
    });
}

safariHacks();