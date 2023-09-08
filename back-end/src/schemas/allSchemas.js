import joi from "joi";

export const postRegistrationSchema = joi.object({
  name: joi.string().required().empty(false).trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().min(6).required().trim(),
  confirmPassword: joi.string().min(6).required().trim(),
});

export const postSigninSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().min(6).required().trim(),
});

export const schemaTransactions = joi.object({
  value: joi.number().required(),
  descricao: joi.string().max(40).trim(),
});
