import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.send('🚀 HyperHive API running...');
});

export default app;
