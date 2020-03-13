(function () { 
    window.addEventListener('keydown', (event) => { 
        const audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
        const key = document.querySelector(`[data-key='${event.keyCode}']`);
        audio.currentTime = 0;
        audio.play();
    })
})()

