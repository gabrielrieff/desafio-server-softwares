import cors from "cors";
import express from "express";
import { router } from "./routes/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3333, () => console.log(`listening on port ${3333}!`));