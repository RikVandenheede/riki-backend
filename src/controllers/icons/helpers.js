import { connection } from "../../services/index.js";

const getIconIds = async (myArr, query) => {
  try {
    await new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) throw error;

        console.log(results);

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

const getIconNames = async (myArr, query) => {
  try {
    await new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) throw error;

        results.forEach((e) => {
          myArr.push(e.name);
        });

        resolve();
      });
    });
  } catch (error) {
    res.status(500).send("Error retrieving data");
  }
};

export { getIconIds, getIconNames };
