import express from "express";
import cors from "cors";
import joi from "joi";
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

app.post("/registration", async (req, res) => {
  const { email, name, foto, password } = req.body;

  const validation = postRegistration.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const erros = validation.error.details.map((value) => value.message);
    return res.status(442).send(erros);
  }

  try {
    const findName = await db
      .collection("registration")
      .findOne({ name: name });
    if (findName) {
      return res.status(409).send({ error: "Este nome já está em uso" });
    }

    const findEmail = await db
      .collection("registration")
      .findOne({ email: email });
    if (findEmail) {
      return res.status(409).send({ error: "Este email já está em uso" });
    }

    await db.collection("registration").insertOne(req.body);
    res.send("201");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("listen on 5000");
});
