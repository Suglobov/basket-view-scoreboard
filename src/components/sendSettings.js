const sendSettings = (objectToSend) => {
    window.electron.sendSettings(objectToSend);
};

export default sendSettings;
