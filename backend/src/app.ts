import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
app.listen(3000);
