import { celebrate, Joi, Segments } from 'celebrate';

const validateProductBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    category: Joi.string().required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    description: Joi.string().optional(),
    price: Joi.number().allow(null),
  }),
});

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.string().length(24).hex()).min(1).required(),
  }),
});

export default { validateProductBody, validateOrderBody };
