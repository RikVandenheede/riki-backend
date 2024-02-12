import { connection } from "../../services/index.js";

const getArticleIds = async (myArr, query) => {
  try {
    await new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) throw error;

        results.forEach((e) => {
          myArr.push(e.id);
        });
        resolve();
      });
    });
  } catch (error) {
    res.status(500).send("Error retrieving data");
  }
};

export { getArticleIds };
