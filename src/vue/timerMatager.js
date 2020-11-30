import TimerManager from '../components/TimerManager.js';
import vueData from './vueData.js';
import sendSettings from '../components/sendSettings.js';

const timerManager = new TimerManager();
timerManager.events.on('timerChanged', (modifiedParts = ['']) => {
    const { timer } = timerManager;
    setTimeout(() => {
        vueData.timer.tenths = timer.tenths;
        vueData.timer.seconds = timer.seconds;
        vueData.timer.minutes = timer.minutes;
    });

    const partsForSend = ['seconds', 'minutes'];
    if (modifiedParts.some((part = '') => partsForSend.includes(part))) {
        sendSettings({ timer: { seconds: timer.seconds, minutes: timer.minutes } });
    }
});
timerManager.events.on('counter24Changed', (modifiedParts = ['']) => {
    const { counter24 } = timerManager;
    setTimeout(() => {
        vueData.counter24.tenths = counter24.tenths;
        vueData.counter24.seconds = counter24.seconds;
    });

    const partsForSend = ['seconds', 'minutes'];
    if (modifiedParts.some((part = '') => partsForSend.includes(part))) {
        sendSettings({ counter24: { tenths: counter24.tenths, seconds: counter24.seconds } });
    } else if (counter24.getFullTenths() < 100) {
        sendSettings({ counter24: { tenths: counter24.tenths, seconds: counter24.seconds } });
    }
});
timerManager.events.on('endOfQuarter', () => {
    vueData.soundBuzzerTimer.play();
});
timerManager.events.on('endOfCounter24', () => {
    vueData.soundBuzzerCounter24.play();
});

timerManager.changeTimerParts({ tenths: 9, seconds: 5, minutes: 1 });
timerManager.changeCounter24Parts({ tenths: 3, seconds: 7 });

export default timerManager;
