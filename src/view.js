import './common.js';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
ws.onopen = () => {
    console.log('WebSocket connection established');
};
ws.onclose = (event) => {
    console.log('event', event);
};
ws.onerror = (error) => {
    console.log('WebSocket connection error:', error);
};
ws.onmessage = (event) => {
    const dataJson = JSON.parse(event.data);
    console.log('dataJson', dataJson);
};
