import express from "express";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
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

const postRegistration = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  foto: joi.string(),
  password: joi.string().required(),
});

app.post("/sign-up", async (req, res) => {
  const { email, name, foto, password } = req.body;

  const validation = postRegistration.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  try {
    const findEmail = await db
      .collection("registration")
      .findOne({ email: email });
    if (findEmail) {
      return res.status(409).send({ error: "Este email já está em uso" });
    }

    await db.collection("registration").insertOne({
      name,
      email,
      foto,
      password: passwordEncrypted,
    });
    res.send("201");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const findEmail = await db
    .collection("registration")
    .findOne({ email: email });
  if (!findEmail) {
    return res.status(409).send({ error: "Usuário não encontrado" });
  }

  const isValid = bcrypt.compareSync(password, findEmail.password);
  if (!isValid) {
    return res.status(401).send({ error: "Senha ou email, errado" });
  }
  res.send(200);
});

app.listen(5000, () => {
  console.log("listen on 5000");
});
