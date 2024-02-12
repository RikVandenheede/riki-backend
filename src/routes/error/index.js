import express from "express";
import { get404 } from "../../controllers/error/index.js";

const router = express.Router();

router.get("*", get404);

export default router;
