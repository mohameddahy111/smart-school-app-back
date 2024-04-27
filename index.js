import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./db/connect.js";
import userRouter from "./src/users/router/user.router.js"




dotenv.config()

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use("/users/", userRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 400).send(err.message);
});
connect()


app.listen(process.env.PORT || port, () => {
  console.log(`http://localhost:${port}`);
});
