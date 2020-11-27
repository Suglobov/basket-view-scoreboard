import { funcStorage, hotKeyAction, hotKeyBindFunc } from './hotKeysFuncsStorages.js';

const actionsForTemporarilyStopCounter24RunningWithTimer = ['setCounter24To14', 'setCounter24To24'];
const checkingConditions = (target = {}, code = '', hotKeyAction = {}, cbSuccess = () => {}) => {
    if (target.nodeName === 'INPUT' && target.type === 'text') {
        return;
    }
    if (hotKeyAction[code] === undefined) {
        return;
    }
    cbSuccess();
};

const listenHotKeys = () => {
    document.body.addEventListener('keydown', (event) => {
        const { target, code } = event;
        checkingConditions(target, code, hotKeyAction, () => {
            event.preventDefault();
            hotKeyAction[code]();

            if (actionsForTemporarilyStopCounter24RunningWithTimer.includes(hotKeyBindFunc[code])) {
                funcStorage.setIsCounter24TemporaryStopToTrue.action();
            }
        });
    }, { capture: true });

    document.body.addEventListener('keyup', (event) => {
        const { target, code } = event;
        checkingConditions(target, code, hotKeyAction, () => {
            if (actionsForTemporarilyStopCounter24RunningWithTimer.includes(hotKeyBindFunc[code])) {
                funcStorage.setIsCounter24TemporaryStopToFalse.action();
            }
        });
    }, { capture: true });
};

export default listenHotKeys;
