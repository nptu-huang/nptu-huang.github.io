function safariHacks() {
    let windowsVH = window.innerHeight / 100;
    document.querySelector('.right').style.setProperty('--vh', windowsVH + 'px');
    document.querySelector('.left').style.setProperty('--vh', windowsVH + 'px');
    window.addEventListener('resize', function () {
        document.querySelector('.right').style.setProperty('--vh', windowsVH + 'px');
        document.querySelector('.left').style.setProperty('--vh', windowsVH + 'px');
    });
}

safariHacks();