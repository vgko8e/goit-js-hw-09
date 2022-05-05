const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let intervalId = null; 
refs.stopBtn.disabled = true;

function colorSwitch() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function onClickStartBtn() {
    intervalId = setInterval(colorSwitch, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};

function onClickStopBtn() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
};




