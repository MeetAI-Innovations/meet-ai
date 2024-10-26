import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addDialogue } from "../controllers/summary.controller";

const router = Router()

router.use(verifyJWT)

router.route("/add-dialogue").patch(addDialogue)

export default router