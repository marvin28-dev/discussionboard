import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/getComments", getComments);
router.post("/addComment", addComment);
router.delete("/:id", deleteComment);

export default router;
