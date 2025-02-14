import { generateCode } from "../service/ai.service.js";

export const getReviewdCode = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(200).json({
                message: "Please Enter the code you want to reviewd",
                status: false
            })
        }

        const result = await generateCode(code);
        res.status(200).send(result)
    } catch (error) {
        throw new Error(error)
    }
}