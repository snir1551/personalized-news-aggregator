import amqplib from 'amqplib';
import {connectToRabbitMQ} from '../config/rabbitmq.js'
const QUEUE_NAME = 'user.preferences';

export const sendToQueue = async (message) => {
    const connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
    console.log("Message sent to queue:", message);
    await channel.close();
    await connection.close();
};