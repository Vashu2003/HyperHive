import dotenv from 'dotenv';

dotenv.config();

import connectDB from './src/config/db.js';
import app from './src/app.js';


const PORT = process.env.PORT || 5000;

// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
});

