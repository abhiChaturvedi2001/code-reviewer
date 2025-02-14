import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import aiRouter from "./routes/aiRoutes.js"
dotenv.config({});


const options = {
    origin: "http://localhost:3000",
    credentials: true
}
const app = express();
app.use(express.json());
app.use(cors(options));
app.use("/", aiRouter)


const port = process.env.PORT
app.listen(port, () => {
    console.log("server is runnig", port);
})