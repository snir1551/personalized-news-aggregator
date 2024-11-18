import amqp from 'amqplib';
import { connectToRabbitMQ } from '../config/rabbitmq.js'
export const preferencesCache = new Map();

export const connectRabbitMQ = async () => {
  try {
    const connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue('user.preferences');

    
    channel.consume('user.preferences', (msg) => {
      const { userId, preferences } = JSON.parse(msg.content.toString());
      console.log(`Received preferences update for user ${userId}`);
      preferencesCache.set(userId, preferences);
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};