import express from "express";
import {
  postArticle,
  getAllArticles,
  getOneArticle,
  updateArticle,
  deleteArticle,
} from "../../controllers/articles/index.js";

const router = express.Router();

router.post("/", postArticle);

router.get("/", getAllArticles);

router.get("/:id", getOneArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;
