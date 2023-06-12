import joi from "joi";

export const postRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().min(6).required(),
});

export const postSigninSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const schemaTransactions = joi.object({
  value: joi.number().required(),
  descricao: joi.string().max(40).trim().required(),
});
