import { connection } from "../../services/index.js";
import { getMatchingBlocks } from "./helpers.js";
import {
  sql_getAllArticles,
  sql_getOneArticle,
  sql_getAllMatchingTextblocks,
  sql_updateArticleTitle,
  sql_updateMatchingTextblocks,
} from "../../services/calls.js";

// const postArticle = (req, res) => {
//   let parentID = 0;
//   let errors = [];
//   const { title, textBlocks } = req.body;

//   if (title === "" || title === undefined) {
//     errors.push({ error: "Gelieve een Titel in te vullen" });
//   }

//   if (textBlocks.length > 0) {
//     textBlocks.forEach((textBlock) => {
//       if (textBlock.text === "" || textBlock.text === undefined) {
//         errors.push({ error: "Gelieve de text in te vullen" });
//       }
//       if (textBlock.text_order === 0 || textBlock.text_order === undefined) {
//         errors.push({
//           error: "Gelieve de order in te vullen en deze kan geen 0 zijn",
//         });
//       }
//     });
//   }

//   if (errors.length > 0) {
//     res.status(400).send(errors);
//     return;
//   }

//   connection.query(
//     `INSERT INTO articles(title) VALUES('${title}')`,
//     (error, result) => {
//       if (error) throw error;
//       parentID = result.insertId;

//       if (textBlocks.length > 0) {
//         textBlocks.forEach((textBlock) => {
//           connection.query(
//             `INSERT INTO textblocks(parent_id, text, text_order) VALUES(${parentID}, '${textBlock.text}', ${textBlock.text_order})`,
//             (error, result) => {
//               if (error) throw error;
//             }
//           );
//         });
//       }

//       res.send("ok");
//     }
//   );
// };

// const getAllArticles = (req, res) => {
//   connection.query(sql_getAllArticles, (error, results, fields) => {
//     if (error) throw error;

//     res.status(200).send(results);
//   });
// };

// const getOneArticle = async (req, res) => {
//   const id = parseInt(req.params.id);
//   let errors = [];
//   let myArr = [];

//   try {
//     await new Promise((resolve, reject) => {
//       connection.query(sql_getAllArticles, (error, results, fields) => {
//         if (error) throw error;

//         myArr = results.map((e) => e.id);
//         resolve();
//       });
//     });
//   } catch (error) {
//     res.status(500).send("Error retrieving data");
//   }

//   if (!myArr.includes(id)) {
//     errors.push({ error: `article met id: ${id} bestaat niet!` });
//   }

//   if (errors.length > 0) {
//     res.status(200).send(errors);
//     return;
//   }

//   /**
//    * Blueprint of data
//    */
//   let articleData = {
//     title: "",
//     textBlocks: [],
//   };

//   /**
//    * Get Title
//    */
//   await connection.query(sql_getOneArticle(id), (error, results, fields) => {
//     if (error) throw error;

//     articleData.title = results[0].title;
//   });

//   /**
//    * Get Textblocks
//    */
//   await getMatchingBlocks(
//     articleData.textBlocks,
//     sql_getAllMatchingTextblocks(id)
//   );

//   /**
//    * get Photos
//    */
//   //   await getMatchingBlocks(articleData, sql_getOneArticle(id));

//   res.send(articleData);

//   console.log("yeeet", articleData);
// };

// const updateArticle = (req, res) => {
//   //checken of id bestaat
//   const id = parseInt(req.params.id);
//   let errors = [];

//   const { title, textBlocks } = req.body;

//   console.log(id);
//   console.log(req.body.title);

//   /**
//    * DEZE werkt (udate title)
//    */
//   // connection.query(sql_updateArticleTitle(title, id), (error, results) => {
//   //   if (error) throw error;

//   //   res.status(200).send({ success: "successfully updated Article Title!" });
//   // });

//   textBlocks.forEach((textblock) => {
//     console.log(textblock);
//     connection.query(
//       sql_updateMatchingTextblocks(textblock.text, textblock.text_order, id),
//       (error, results) => {
//         if (error) throw error;
//       }
//     );
//   });

//   res.status(200).send({ success: "successfully updated Textblock!" });

//   // if (!getIconIds.includes(id)) {
//   //   errors.push({ error: `svg met id: ${id} bestaat niet!` });
//   // }

//   // if (errors.length > 0) {
//   //   res.status(400).send(errors);
//   //   return;
//   // }
// };

// export { postArticle, getOneArticle, getAllArticles, updateArticle };
