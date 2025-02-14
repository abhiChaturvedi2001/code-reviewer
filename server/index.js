import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import aiRouter from "./routes/aiRoutes.js"
dotenv.config({});


const options = {
    origin: "https://code-reviewer-flame.vercel.app",
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