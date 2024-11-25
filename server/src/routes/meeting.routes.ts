import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addJoinedParticipant, createMeeting, endMeeting, getMeeting, sendEmailAtScheduledTime } from "../controllers/meeting.controller";
import { get } from "http";

const router = Router()
router.route("/get-meeting/:id").get(getMeeting)

router.use(verifyJWT)
router.route("/createmeeting").post(createMeeting)
router.route("/add-participant").put(addJoinedParticipant)
router.route("/end-meeting/:meetingId").put(endMeeting)
router.route("/send-meeting-notification/:roomId").get(sendEmailAtScheduledTime)
export default router;  