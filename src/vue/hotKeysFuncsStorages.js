import vueData from './vueData.js';
import timerManager from './timerMatager.js';

const funcStorage = {
    startStopTimer: {
        hint: 'остановка/запуск таймера',
        action: () => {
            if (timerManager.isTimerRunning === false) {
                timerManager.startTimer();
            } else {
                timerManager.stopTimer();
            }
        },
    },
    setTimerTo5m: {
        hint: 'таймер на 5 минут',
        action: () => {
            timerManager.changeTimerParts({ tenths: 0, seconds: 0, minutes: 5 });
        },
    },
    setTimerTo10m: {
        hint: 'таймер на 10 минут',
        action: () => {
            timerManager.changeTimerParts({ tenths: 0, seconds: 0, minutes: 10 });
        },
    },
    startStopCounter24: {
        hint: 'старт/стоп счетчика 24',
        action: () => {
            if (timerManager.isCounter24RunningWithTimer === false) {
                timerManager.startCounter24RunningWithTimer();
            } else {
                timerManager.stopCounter24RunningWithTimer();
            }
        },
    },
    setIsCounter24TemporaryStopToTrue: {
        hint: 'временный приостанавливает счетчик 24',
        action: () => {
            timerManager.setIsCounter24TemporaryStopToTrue();
        },
    },
    setIsCounter24TemporaryStopToFalse: {
        hint: 'отключает временное приостановление счетчика 24',
        action: () => {
            timerManager.setIsCounter24TemporaryStopToFalse();
        },
    },
    setCounter24To14: {
        hint: 'счетчик 24 на 14',
        action: () => {
            timerManager.changeCounter24Parts({ tenths: 0, seconds: 14 });
        },
    },
    setCounter24To24: {
        hint: 'счетчик 24 на 24',
        action: () => {
            timerManager.changeCounter24Parts({ tenths: 0, seconds: 24 });
        },
    },
    addScoreLeft1: {
        hint: '+1 к левой команде',
        action: () => {
            vueData.scoreLeft += 1;
        },
    },
    addScoreLeft2: {
        hint: '+2 к левой команде',
        action: () => {
            vueData.scoreLeft += 2;
        },
    },
    addScoreLeft3: {
        hint: '+3 к левой команде',
        action: () => {
            vueData.scoreLeft += 3;
        },
    },
    addScoreRight1: {
        hint: '+1 к правой команде',
        action: () => {
            vueData.scoreRight += 1;
        },
    },
    addScoreRight2: {
        hint: '+2 к правой команде',
        action: () => {
            vueData.scoreRight += 2;
        },
    },
    addScoreRight3: {
        hint: '+3 к правой команде',
        action: () => {
            vueData.scoreRight += 3;
        },
    },
};
const hotKeyStorage = {
    KeyQ: { hint: 'Q' },
    KeyW: { hint: 'W' },
    KeyE: { hint: 'E' },
    KeyA: { hint: 'A' },
    KeyS: { hint: 'S' },
    KeyD: { hint: 'D' },
    KeyZ: { hint: 'Z' },
    KeyX: { hint: 'X' },
    KeyC: { hint: 'C' },
    Space: { hint: 'Пробел' },
};
const hotKeyFuncSettings = [
    { hotKey: 'KeyQ', func: 'addScoreLeft1' },
    { hotKey: 'KeyW', func: 'addScoreLeft2' },
    { hotKey: 'KeyE', func: 'addScoreLeft3' },
    { hotKey: 'KeyA', func: 'startStopCounter24' },
    { hotKey: 'KeyS', func: 'setCounter24To14' },
    { hotKey: 'KeyD', func: 'setCounter24To24' },
    { hotKey: 'KeyZ', func: 'addScoreRight1' },
    { hotKey: 'KeyX', func: 'addScoreRight2' },
    { hotKey: 'KeyC', func: 'addScoreRight3' },
    { hotKey: 'Space', func: 'startStopTimer' },
];
const hotKeyBindFunc = hotKeyFuncSettings.reduce((res, elem) => {
    res[elem.hotKey] = elem.func;
    return res;
}, {});
const funcBindHotKey = hotKeyFuncSettings.reduce((res, elem) => {
    res[elem.func] = elem.hotKey;
    return res;
}, {});
const hotKeyAction = Object.keys(hotKeyStorage).reduce((res, hotKeyName) => {
    const funcName = hotKeyBindFunc[hotKeyName];
    const currentAction = funcStorage[funcName].action;
    res[hotKeyName] = (funcName === undefined) ? () => {} : currentAction;
    return res;
}, {});
const funcHint = Object.keys(funcStorage).reduce((res, funcName) => {
    const hotKeyName = funcBindHotKey[funcName];
    const currentHotKey = hotKeyStorage[hotKeyName];
    res[funcName] = (hotKeyName === undefined) ? '' : currentHotKey.hint;
    return res;
}, {});


export {
    funcStorage,
    hotKeyStorage,
    hotKeyFuncSettings,
    hotKeyBindFunc,
    funcBindHotKey,
    hotKeyAction,
    funcHint,
};
