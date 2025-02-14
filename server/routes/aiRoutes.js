import express from "express"
import { getReviewdCode } from "../controllers/aiController.js";
const router = express.Router();

router.post("/review-code", getReviewdCode)

export default router