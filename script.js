const html = document.querySelector('html');
const focusBt = document.querySelector('.app__card-button--foco');
const shortBreakBt = document.querySelector('.app__card-button--curto');
const longBreakBt = document.querySelector('.app__card-button--longo');
const pauseIcon = document.querySelector('.app__card-primary-butto-icon');
const startPauseBt = document.querySelector('#start-pause');
const startPauseText = document.querySelector('#start-pause span');
const timerDisplay = document.querySelector('#timer');

let elapsedTimeInSeconds = 1500;
let intervalId = null;

document.addEventListener("DOMContentLoaded", displayTime);

focusBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 1500;
    changeContext('focus');
    focusBt.classList.add('active');
});

shortBreakBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 300;
    changeContext('short-break');
    shortBreakBt.classList.add('active');
});

longBreakBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 900;
    changeContext('long-break');
    longBreakBt.classList.add('active');
});

function changeContext(context) {
    displayTime();
    document.querySelectorAll('.app__card-button').forEach(btn => btn.classList.remove('active'));
    html.setAttribute('data-context', context);
}

const countdown = () => {
    if (elapsedTimeInSeconds <= 0) {
        alert('Time is up!');
        resetTimer();
        return;
    }
    elapsedTimeInSeconds -= 1;
    displayTime();
};

startPauseBt.addEventListener('click', startOrPause);

function startOrPause() {
    if (intervalId) {
        resetTimer();
        return;
    }
    intervalId = setInterval(countdown, 1000);
    startPauseText.textContent = "Pause";
    pauseIcon.setAttribute('src', `./images/pause.png`);
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    startPauseText.textContent = "Start";
    pauseIcon.setAttribute('src', `./images/play_arrow.png`);
}

function displayTime() {
    const minutes = Math.floor(elapsedTimeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedTimeInSeconds % 60).toString().padStart(2, '0');
    timerDisplay.innerHTML = `<div class='timer-box'>${minutes}:${seconds}</div>`;
}


document.getElementById('report-btn').addEventListener('click', function () {
    document.getElementById('report-modal').style.display = 'block';
});
document.getElementById('settings-btn').addEventListener('click', function () {
    document.getElementById('settings-modal').style.display = 'block';
});
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', function () {
        this.parentElement.parentElement.style.display = 'none';
    });
});
window.addEventListener('click', function (event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});