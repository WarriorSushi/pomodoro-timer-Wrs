class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startBtn = document.getElementById('start');
        this.pauseBtn = document.getElementById('pause');
        this.resetBtn = document.getElementById('reset');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        
        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.changeMode(btn));
        });
        
        // Initialize display
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.playAlarm();
                    this.reset();
                }
            }, 1000);
        }
    }
    
    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }
    
    reset() {
        this.pause();
        this.timeLeft = parseInt(document.querySelector('.mode-btn.active').dataset.time) * 60;
        this.updateDisplay();
    }
    
    changeMode(selectedBtn) {
        this.modeBtns.forEach(btn => btn.classList.remove('active'));
        selectedBtn.classList.add('active');
        this.reset();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    playAlarm() {
        // Create and play a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 