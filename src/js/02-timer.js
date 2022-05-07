import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelectorAll('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
}

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {
    downTimer.start();
    refs.input.disabled = true;
});

const downTimer = {
    intervalId: null,
    isActive: false,
    
    start() {
    if (this.isActive) {
        return;
    }
    this.isActive = true;    
    refs.startBtn.setAttribute('disabled', true);

    this.intervalId =  setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = refs.input.value - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateDownTimer({ days, hours, minutes, seconds });
        
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
    }
}

function updateDownTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        refs.input.value = selectedDates[0].getTime();
        if (refs.input.value < Date.now()) {
            alert("Please choose a date in the future")
        }
        else {
            refs.startBtn.disabled = false;
        };
    },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = addLeadingZero(Math.floor(ms / day));
// Remaining hours
const hours = addLeadingZero(Math.floor((ms % day) / hour));
// Remaining minutes
const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
// Remaining seconds
const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

return { days, hours, minutes, seconds };
}