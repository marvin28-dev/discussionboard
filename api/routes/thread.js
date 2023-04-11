import express from "express";
import { getThread, addThread, deletePost } from "../controllers/thread.js";

const router = express.Router();

router.get("/", getThread);
router.post("/", addThread);
router.delete("/:id", deletePost);

export default router;
