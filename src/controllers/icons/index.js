import { connection } from "../../services/index.js";
import { getIconIds, getIconNames } from "./helpers.js";
import {
  sql_getAllIcons,
  sql_getOneIcon,
  sql_postIcon,
  sql_updateIcon,
  sql_deleteIcon,
} from "../../services/calls.js";

/**
 * GET requests (READ)
 *
 * @param {*} req
 * @param {*} res
 */
const getAllIcons = (req, res) => {
  connection.query(sql_getAllIcons, (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(results);
  });
};

const getOneIcon = async (req, res) => {
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getIconIds(myArr, sql_getAllIcons);

  if (!myArr.includes(id)) {
    errors.push({ error: `svg met id: ${id} bestaat niet!` });
  }

  if (errors.length > 0) {
    res.status(200).send(errors);
    return;
  }

  connection.query(sql_getOneIcon(id), (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(results);
  });
};

/**
 * POST request (CREATE)
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const postIcon = async (req, res) => {
  const { svg_code, name } = req.body;
  let errors = [];
  let myArr = [];

  // Sets all the names 'myArr'
  await getIconNames(myArr, sql_getAllIcons);

  if (myArr.includes(name)) {
    errors.push({ error: "There is already a svg with that name" });
  }

  if (name === "" || name === undefined) {
    errors.push({ error: "please fill in a name" });
  }

  if (svg_code.substr(0, 5) !== "<svg ") {
    errors.push({ error: "please fill in a svg" });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(sql_postIcon(svg_code, name), (error) => {
    if (error) throw error;

    res.status(200).send({ success: "successfully added svg!" });
  });
};

/**
 * PATCH request (UPDATE)
 *
 * @param {*} req
 * @param {*} res
 */
const updateIcon = async (req, res) => {
  const { svg_code, name } = req.body;
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getIconIds(myArr, sql_getAllIcons);

  if (!myArr.includes(id)) {
    errors.push({ error: `svg met id: ${id} bestaat niet!` });
  }

  if (svg_code.substr(0, 5) !== "<svg ") {
    errors.push({ error: "please fill in a correct svg" });
  }

  if (name === "" || name === undefined) {
    errors.push({ error: "please fill in a name" });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(sql_updateIcon(svg_code, name, id), (error, results) => {
    if (error) throw error;

    res.status(200).send({ success: "successfully updated svg!" });
  });
};

/**
 * DELETE request (DELETE)
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteIcon = async (req, res) => {
  const id = parseInt(req.params.id);
  let myArr = [];
  let errors = [];

  // Sets all the id's 'myArr'
  await getIconIds(myArr, sql_getAllIcons);

  if (!myArr.includes(id)) {
    errors.push({ error: `svg met id: ${id} bestaat niet!` });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(sql_deleteIcon(id), (error) => {
    if (error) throw error;

    res.status(200).send({ success: "deleted svg successfully!" });
  });
};

export { getAllIcons, getOneIcon, postIcon, deleteIcon, updateIcon };
