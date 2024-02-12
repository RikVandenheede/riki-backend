import mysql from "mysql";
import { sql_getAllIcons } from "./calls.js";

/**
 * MYSQL connection
 */
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "riki",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

export { connection };
