import { createLogger, format, transports } from 'winston';
import path from 'path';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const logDir = path.join(__dirname, 'logs');


export const logger = createLogger({
    level: 'info', 
    format: format.combine(
        format.timestamp(), 
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

