document.addEventListener("DOMContentLoaded", function () {
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
    let pomodoroTime = 1500;
    let shortBreakTime = 300;
    let longBreakTime = 900;

    document.addEventListener("DOMContentLoaded", displayTime);

    focusBt.addEventListener('click', () => {
        elapsedTimeInSeconds = pomodoroTime;
        changeContext('focus');
        focusBt.classList.add('active');
    });

    shortBreakBt.addEventListener('click', () => {
        elapsedTimeInSeconds = shortBreakTime;
        changeContext('short-break');
        shortBreakBt.classList.add('active');
    });

    longBreakBt.addEventListener('click', () => {
        elapsedTimeInSeconds = longBreakTime;
        changeContext('long-break');
        longBreakBt.classList.add('active');
    });

    function changeContext(context) {
        displayTime();
        document.querySelectorAll('.app__card-button').forEach(btn => btn.classList.remove('active'));
        html.setAttribute('data-context', context);
        document.body.style.transition = 'background-color 0.5s';
        if (context === 'focus') {
            document.body.style.backgroundColor = '#BA4949';
        } else if (context === 'short-break') {
            document.body.style.backgroundColor = '#6c5b7b';
        } else if (context === 'long-break') {
            document.body.style.backgroundColor = '#355c7d';
        }
    }

    const countdown = () => {
        if (elapsedTimeInSeconds <= 0) {
            alert('Time is up!');
            resetTimer();
            return;
        }
        elapsedTimeInSeconds--;
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

    document.getElementById('settings-btn').addEventListener('click', function () {
        document.getElementById('settings-modal').style.display = 'block';
    });

    document.querySelector('.btn-ok').addEventListener('click', function () {
        const inputs = document.querySelectorAll('.time-settings input');
        pomodoroTime = parseInt(inputs[0].value) * 60;
        shortBreakTime = parseInt(inputs[1].value) * 60;
        longBreakTime = parseInt(inputs[2].value) * 60;
        elapsedTimeInSeconds = pomodoroTime; 
        displayTime();
        document.getElementById('settings-modal').style.display = 'none';
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
});