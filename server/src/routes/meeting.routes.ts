import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addJoinedParticipant, createMeeting, endMeeting } from "../controllers/meeting.controller";

const router = Router()

router.use(verifyJWT)
router.route("/create-meeting").post(createMeeting)
router.route("/add-participant").put(addJoinedParticipant)
router.route("/end-meeting:meetingId").put(endMeeting)

export default router