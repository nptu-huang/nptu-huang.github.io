function safariHacks() {
    let windowsVH = window.innerHeight / 100;
    document.querySelector('.wrap').style.setProperty('--vh', windowsVH + 'px');
    window.addEventListener('resize', function() {
        document.querySelector('.wrap').style.setProperty('--vh', windowsVH + 'px');
    });
}

safariHacks();