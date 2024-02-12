import express from "express";
import {
  getAllIcons,
  getOneIcon,
  postIcon,
  updateIcon,
  deleteIcon,
} from "../../controllers/icons/index.js";

const router = express.Router();

router.get("/", getAllIcons);
router.get("/:id", getOneIcon);

router.post("/", postIcon);

router.patch("/:id", updateIcon);

router.delete("/:id", deleteIcon);

export default router;
