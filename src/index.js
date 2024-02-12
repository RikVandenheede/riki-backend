import iconRouter from "./routes/icons/index.js";
import errorRouter from "./routes/articles/index.js";
import articleRouter from "./routes/articles/index.js";
import loginRouter from "./routes/login/index.js";

import { authenticateToken } from "./controllers/login/index.js";

import express from "express";
import cors from "cors";

const port = 3000;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/icons", authenticateToken, iconRouter);

app.use("/api/articles", authenticateToken, articleRouter);

app.use("/api/login", loginRouter);

app.use("", errorRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
