import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter({ captureRejections: true })

export default eventEmitter;
