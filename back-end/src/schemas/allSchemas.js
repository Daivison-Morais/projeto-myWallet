import joi from "joi";

export const postRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});

export const postNewInSchema = joi.object({
  value: joi.required(),
  descricao: joi.string().required(),
});

export const postSigninSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const postNewoutSchema = joi.object({
  value: joi.required(),
  descricao: joi.string().required(),
});
