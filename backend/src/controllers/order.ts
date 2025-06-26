import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      items,
      total,
      payment,
      email,
      phone,
      address,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Поле items должно быть непустым массивом'));
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    const invalidItems = products.filter((p) => p.price == null);
    if (invalidItems.length > 0) {
      return next(new BadRequestError('Некоторые товары не продаются (price = null)'));
    }

    if (typeof total !== 'number') {
      return next(new BadRequestError('Некорректное поле total'));
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price ?? 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError('Некорректная сумма заказа'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Неверный тип оплаты'));
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return next(new BadRequestError('Некорректный email'));
    }

    if (!phone || typeof phone !== 'string') {
      return next(new BadRequestError('Телефон обязателен'));
    }

    if (!address || typeof address !== 'string') {
      return next(new BadRequestError('Адрес обязателен'));
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({ id: orderId, total: calculatedTotal });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
