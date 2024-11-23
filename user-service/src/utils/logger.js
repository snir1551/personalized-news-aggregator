import { createLogger, format, transports } from 'winston';
import path from 'path';


const __dirname = path.dirname(new URL(import.meta.url).pathname);


const logDir = path.join(__dirname, 'logs');


console.log('Log directory path:', logDir);


// if (!fs.existsSync(logDir)) {
//     try {
//         fs.mkdirSync(logDir, { recursive: true });
//         console.log('Log directory created successfully');
//     } catch (err) {
//         console.error('Error creating log directory:', err);
//     }
// } else {
//     console.log('Log directory already exists');
// }


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
        
        
        // new transports.File({ filename: path.join(logDir, 'app.log') })
    ],
});

