import express from "express";
import {
  postLoginDetails,
  createNewToken,
} from "../../controllers/login/index.js";

const router = express.Router();

router.post("/", postLoginDetails);
router.post("/token", createNewToken);

export default router;
