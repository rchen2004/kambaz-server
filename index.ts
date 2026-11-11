import express from "express";
import Hello from "./Hello";
import Lab5 from "./Lab5/index";
const app = express();
Hello(app);
Lab5(app);
app.listen(4000);