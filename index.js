import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

// env variables
dotenv.config();

// connect to Mongodb database
mongoose.connect(process.env.ATLAS_URI);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User Auth API');
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Global Error Middleware
app.use((err, req, res, next) => {
  res.send('Something went really wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
