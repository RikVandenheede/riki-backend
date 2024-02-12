// Inloggen gebruiker => maakt accessToken aan => in cookies zetten (HTTP cookie only)
// => per request naar eigen endpoint nagaan of de token valid is? (middeware => functie authenticateToken).. Deze gaat na of het geldig s of niet
// => In FE Token meesturen in headers, zo kan in de BE deze gevalideerd worden.
// => RefreshToken is voor popup om te vragen of je ingelogd wilt blijven => Accesstoken in voor initiele login.

import { connection } from "../../services/index.js";
import { sql_getCorrectUser } from "../../services/calls.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const jwt = jsonwebtoken;

// Nodig voor gegevens uit de .env te halen.
dotenv.config();

// @TODO
let refreshTokens = [];

/**
 * GET requests (READ)
 *
 * @param {*} req
 * @param {*} res
 */

// @TODO
// - User and password uit db halen en checken of dat klopt
// - Encryter password bij register en decrypt bij uitlezen
// - na validatie mag je als response de jwt meesturen
const postLoginDetails = async (req, res) => {
  let { username, password } = req.body;
  let hashedPsw = "";

  let errors = [];

  if (!username || username == "") {
    errors.push({ error: "Gelieve een geldige username in te vullen" });
  }

  if (!password || password == "") {
    errors.push({ error: "Gelieve een geldig wachtwoord in te vullen" });
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  connection.query(sql_getCorrectUser(username), (error, results, fields) => {
    if (error) throw error;

    customAuth(results[0]?.password);
  });

  async function customAuth(hashedPassword) {
    // This is used to store encrypted passwords into the DB
    // const salt = await bcrypt.genSalt(10);
    // hashedPsw = await bcrypt.hash(password, salt);

    const passwordCheck = await bcrypt.compare(password, hashedPassword);

    if (!passwordCheck) {
      res.status(400).send({ error: "Password incorrect!" });
      return;
    }

    // user moet een Object zijn voor het serializen (JWT det dit elf met sign())
    // Serializen => object omzetten naar byte code en andersom kan ook
    const user = { name: username, password: password };

    // jwt.sign() => pakt de payload (wat we willen serializen)/ in dit geval een user Object
    // Om te seriazen heb je een secret KEY nodig
    const accessToken = generateAccessToken(user);

    const refreshToken = jwt.sign(
      user,
      "512dd70e01c765169bc78dd4fd212a42244d732dc584cad9846130bc7e4fc5c42038c029ccd4d08997ce3604677415d506eea1988986bbf479f5ec16d2dae801"
    );

    // @TODO
    // checken of deze al bestaat in de DB
    refreshTokens.push(refreshToken);

    // Stuurt de accestoken naar de endpoint
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      username,
    });
  }
};

// MIDDELWARE die onze token gaat verifieren.
// Haalt de token uit de headers en checkt of deze bestaat.
// Check daarna met jwt.verify() of het een geldige token is.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Capital or not
  // Als er een is return de token als er geen is return undefined
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  // gaat na of de token geldig is
  jwt.verify(
    token,
    "1099f635b21aeaa816f773c719545fccbe4e0ecc412ff55a13abde1c43a181762a8da5a57625b40d5dc883aeb5f0bd70cb7ac5af319e12bc82c3030212a5205f",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;

      // Goes to the next function. Move on
      next();
    }
  );
};

// Creates refreshtoken
const createNewToken = (req, res) => {
  // token == refreshtoken
  const { token } = req.body;

  if (token == null) return res.sendStatus(401);

  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(
    token,
    "512dd70e01c765169bc78dd4fd212a42244d732dc584cad9846130bc7e4fc5c42038c029ccd4d08997ce3604677415d506eea1988986bbf479f5ec16d2dae801",
    (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });

      res.json({ accessToken: accessToken });
    }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    user,
    "1099f635b21aeaa816f773c719545fccbe4e0ecc412ff55a13abde1c43a181762a8da5a57625b40d5dc883aeb5f0bd70cb7ac5af319e12bc82c3030212a5205f",
    { expiresIn: "6000s" }
  );
};

export { postLoginDetails, authenticateToken, createNewToken };
