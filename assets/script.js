let timer;
let isPaused = false;
let isStarted = false;
let currentSessionType = 'short'; // 'short' or 'long'
let timeLeft = 25 * 60; // default to 25 minutes
const workTime = { short: 25 * 60, long: 50 * 60 };
const breakTime = { 'short-break': 5 * 60, 'long-break': 10 * 60 };

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const shortSessionButton = document.getElementById('short-session');
const longSessionButton = document.getElementById('long-session');
const pomodoroContainer = document.querySelector('.pomodoro-container');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function switchSession() {
    if (currentSessionType === 'short' || currentSessionType === 'long') {
        // Switch to break
        currentSessionType = currentSessionType === 'short' ? 'short-break' : 'long-break';
        timeLeft = breakTime[currentSessionType];
        pomodoroContainer.classList.remove('work-mode');
        pomodoroContainer.classList.add('break-mode');
    } else {
        // Switch to work
        currentSessionType = currentSessionType === 'short-break' ? 'short' : 'long';
        timeLeft = workTime[currentSessionType];
        pomodoroContainer.classList.remove('break-mode');
        pomodoroContainer.classList.add('work-mode');
    }
    updateDisplay();
}

function startTimer() {
    if (timer) return;
    isStarted = true;
    pomodoroContainer.classList.remove('break-mode', 'work-mode');
    pomodoroContainer.classList.add('work-mode');
    timer = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                switchSession();
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isStarted = false;
    currentSessionType = currentSessionType.includes('break') ? (currentSessionType === 'short-break' ? 'short' : 'long') : currentSessionType;
    timeLeft = currentSessionType === 'short' ? 25 * 60 : 50 * 60;
    pomodoroContainer.classList.remove('break-mode', 'work-mode');
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
shortSessionButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    isStarted = false;
    currentSessionType = 'short';
    timeLeft = 25 * 60;
    pomodoroContainer.classList.remove('break-mode', 'work-mode');
    updateDisplay();
});
longSessionButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    isStarted = false;
    currentSessionType = 'long';
    timeLeft = 50 * 60;
    pomodoroContainer.classList.remove('break-mode', 'work-mode');
    updateDisplay();
});

updateDisplay(); // Initialize display
