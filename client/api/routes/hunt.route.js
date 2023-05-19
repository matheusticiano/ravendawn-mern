import express from "express";
import { createHunt, deleteHunt, getHunt, getHunts, getMyHunts, saveHunt, getSavedHunts, unsaveHunt, checkSaved } from "../controller/hunt.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createHunt);
router.delete("/:id", verifyToken, deleteHunt);
router.get("/single/:id", getHunt);
router.get("/", getHunts);
router.get("/myhunts", verifyToken, getMyHunts);
router.post('/:id/save', verifyToken, saveHunt);
router.post('/:id/unsave', verifyToken, unsaveHunt);
router.get('/saved', verifyToken, getSavedHunts);
router.get('/:id/saved', verifyToken, checkSaved);

export default router;