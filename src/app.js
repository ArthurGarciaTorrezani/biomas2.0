import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/mainRoute.js";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "tetecaralho93", 
    cookie: { maxAge: 300000 }, 
  })
);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

export default app;
