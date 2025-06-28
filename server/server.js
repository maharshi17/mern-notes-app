import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch(err => console.log(err));

