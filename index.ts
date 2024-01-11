import express,{Application, NextFunction, Request, Response,} from "express";
import cors from "cors";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./config/dbConfig";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";
import   mongoDBStore  from "connect-mongodb-session";
import passport from "passport";

env.config()

const port: number =  parseInt(process.env.PORT!);

const mongoConnect = mongoDBStore(expressSession)

const app:Application = express();

app.set("trust proxy", 1);

app.use((req:Request, res:Response, next)=>{
  res.header("Access-Control-Allow-Origin","http://localhost:4121");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:4121",
  credentials: false
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
  name: "Nzube",
  secret: "cookie/session_secret",
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 12,
  },
  store: new mongoConnect({
    uri: process.env.DATBASE_URL!,
    collection: "session"
  })
}));

passport.serializeUser(function (user, cb){
  return cb(null, user)
});

passport.deserializeUser(function (user:any,cb){
  return cb(null, user)
});

mainApp(app);

app.use((req:any, res:Response, next:NextFunction)=>{
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb:any)=>{
      cb();
    };
  };
  if (req.session && !req.session.save) {
    req.session.save = (cb:any)=>{
      cb();
    };
  };
  next();
});

passport.initialize();
passport.session();

const server = app.listen(port,()=>{
    console.clear();
    console.log();
    dbConfig();
});

process.on("uncaughtException", (error: Error) => {
    console.log("uncaughtException", error);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection", reason);
    server.close(() => {
      process.exit(1);
    });
    console.log(server)
  });