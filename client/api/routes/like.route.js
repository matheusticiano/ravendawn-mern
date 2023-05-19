import express from "express";
import { likeHunt, getLikes, checkLiked,unlikeHunt } from "../controller/like.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get('/:id/likes', getLikes);
router.get('/:id/liked', verifyToken, checkLiked);
router.post('/:id/like', verifyToken, likeHunt);
router.post('/:id/unlike', verifyToken, unlikeHunt);


export default router;
