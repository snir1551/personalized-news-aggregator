import amqplib from 'amqplib';

export async function connectToRabbitMQ(retries = 5) {
    let connection;
    while (retries > 0) {
      try {
        connection = await amqplib.connect('amqp://rabbitmq:5672');
        break;
      } catch (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        retries -= 1;
        console.log(`Retrying...${retries} attempts left.`);
        await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
      }
    }
    if (!connection) {
      console.error('Failed to connect to RabbitMQ after multiple attempts.');
      process.exit(1);
    }
    return connection;
}
