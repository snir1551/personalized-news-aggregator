import app from './index.js';

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`News Service is running on port ${PORT}`);
});