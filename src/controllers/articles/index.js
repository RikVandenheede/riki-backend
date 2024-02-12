import { connection } from "../../services/index.js";
import { getArticleIds } from "./helpers.js";
import {
  sql_postArticle,
  sql_getAllArticles,
  sql_getOneArticle,
  sql_updateArticle,
  sql_deleteArticle,
} from "../../services/calls.js";

const getAllArticles = (req, res) => {
  setTimeout(() => {
    connection.query(sql_getAllArticles, (error, results) => {
      if (error) throw error;

      res.status(200).send(results);
    });
  }, 5000);
};

const getOneArticle = async (req, res) => {
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getArticleIds(myArr, sql_getAllArticles);

  if (!myArr.includes(id)) {
    errors.push({ error: `article met id: ${id} bestaat niet!` });
  }

  if (errors.length > 0) {
    res.status(200).send(errors);
    return;
  }

  connection.query(sql_getOneArticle(id), (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(results);
  });
};

const postArticle = (req, res, next) => {
  const { title, textBlocks, subtitles, photos, links, codeblocks } = req.body;
  let errors = [];

  if (title === undefined) {
    errors.push({
      error: "Please send an empty string as title if you have none",
    });
  }
  if (textBlocks === undefined) {
    errors.push({
      error: "Please send an empty array of textblocks if you have none",
    });
  }
  if (subtitles === undefined) {
    errors.push({
      error: "Please send an empty array of subtitles if you have none",
    });
  }
  if (photos === undefined) {
    errors.push({
      error: "Please send an empty array of photos if you have none",
    });
  }
  if (links === undefined) {
    errors.push({
      error: "Please send an empty array of links if you have none",
    });
  }
  if (codeblocks === undefined) {
    errors.push({
      error: "Please send an empty array of codeblocks if you have none",
    });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(
    sql_postArticle(title, textBlocks, subtitles, photos, links, codeblocks),
    (error) => {
      if (error) throw error;

      res
        .status(200)
        .send({ success: "successfully added items to your article!" });
    }
  );
};

const updateArticle = async (req, res) => {
  const { title, textBlocks, subtitles, photos, links, codeblocks } = req.body;
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getArticleIds(myArr, sql_getAllArticles);

  if (!myArr.includes(id)) {
    errors.push({ error: `article met id: ${id} bestaat niet!` });
  }

  if (title === undefined) {
    errors.push({
      error: "Please send an empty string as title if you have none",
    });
  }
  if (textBlocks === undefined) {
    errors.push({
      error: "Please send an empty array of textblocks if you have none",
    });
  }
  if (subtitles === undefined) {
    errors.push({
      error: "Please send an empty array of subtitles if you have none",
    });
  }
  if (photos === undefined) {
    errors.push({
      error: "Please send an empty array of photos if you have none",
    });
  }
  if (links === undefined) {
    errors.push({
      error: "Please send an empty array of links if you have none",
    });
  }
  if (codeblocks === undefined) {
    errors.push({
      error: "Please send an empty array of codeblocks if you have none",
    });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(
    sql_updateArticle(
      title,
      textBlocks,
      subtitles,
      photos,
      links,
      codeblocks,
      id
    ),
    (error, results) => {
      if (error) throw error;

      res.status(200).send({ success: "successfully updated article!" });
    }
  );
};

const deleteArticle = async (req, res) => {
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getArticleIds(myArr, sql_getAllArticles);

  if (!myArr.includes(id)) {
    errors.push({ error: `article met id: ${id} bestaat niet!` });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(sql_deleteArticle(id), (error) => {
    if (error) throw error;

    res.status(200).send({ success: "deleted article successfully!" });
  });
};

export {
  postArticle,
  getAllArticles,
  getOneArticle,
  updateArticle,
  deleteArticle,
};
