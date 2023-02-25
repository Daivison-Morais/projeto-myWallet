import express from "express";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("wallet");
});

const postRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  foto: joi.string(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});

const postNewInSchema = joi.object({
  value: joi.required(),
  descricao: joi.string().required(),
});

const postSigninSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const postNewoutSchema = joi.object({
  value: joi.required(),
  descricao: joi.string().required(),
});

app.post("/sign-up", async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ error: "As senhas estão diferentes" });
  }

  const validation = postRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  try {
    const findEmail = await db.collection("users").findOne({ email: email });
    if (findEmail) {
      return res.status(409).send({ error: "Este email já está em uso" });
    }

    await db.collection("users").insertOne({
      name,
      email,
      password: passwordEncrypted,
    });
    res.sendStatus(201);
  } catch (error) {
    console.error("aqui");
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const validation = postSigninSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }

  try {
    const findUser = await db.collection("users").findOne({ email: email });
    if (!findUser) {
      return res.status(404).send({ error: "Senha ou email, errado" });
    }
    const isValid = bcrypt.compareSync(password, findUser.password);
    if (!isValid) {
      return res.status(404).send({ error: "Senha ou email, errado" });
    }

    const token = uuidv4();

    await db.collection("sessions").insertOne({
      token,
      userId: findUser._id, //é o id do usuário
    });

    res.send({ token, user: findUser.name });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/newin", async (req, res) => {
  const { value, descricao } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const validation = postNewInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(442).send(error);
  }

  try {
    const session = await db.collection("sessions").findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (!user) {
      return res.sendStatus(401);
    }

    //retorna o q tem em transações, o que tem la?
    //NÃO DESCER COM A SENHA(HASHING)!!
    //delete user.password -> não remove do banco, apenas do objeto!!
    await db.collection("transactions").insertOne({
      userId: session.userId,
      value,
      descricao,
      date: dayjs().format("DD/MM"),
      in: "true",
    });
    res.send(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/newout", async (req, res) => {
  const { value, descricao } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const validation = postNewoutSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }

  try {
    const session = await db.collection("sessions").findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(401);
    }

    /* const user = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (!user) {
      return res.send(401);
    } */

    //retorna o q tem em transações, o que tem la?
    //NÃO DESCER COM A SENHA(HASHING)!!
    //delete user.password -> não remove do banco, apenas do objeto!!
    await db.collection("transactions").insertOne({
      userId: session.userId,
      value,
      descricao,
      date: dayjs().format("DD/MM"),
      in: "false",
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/transactions", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    console.log(session);

    const userTransactions = await db
      .collection("transactions")
      .find({
        userId: session.userId,
      })
      .toArray();

    res.send(userTransactions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`listen on ${process.env.PORT}`);
});
