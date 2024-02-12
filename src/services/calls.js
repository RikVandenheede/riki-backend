/**
 * Collection of DB calls
 */

/**
 * USERS
 */

const sql_getCorrectUser = (username) => {
  return `SELECT password FROM users WHERE username = '${username}';`;
};

/**
 * ICONS
 */

const sql_getAllIcons = "SELECT * FROM icons";

const sql_getOneIcon = (id) => {
  return `SELECT * FROM icons WHERE id = ${id}`;
};

const sql_postIcon = (svg_code, name) => {
  return `INSERT INTO icons(svg_code, name) VALUES("${svg_code}", '${name}')`;
};

const sql_updateIcon = (svg_code, name, id) => {
  return `UPDATE icons SET name = '${name}', svg_code = "${svg_code}"  WHERE id = ${id}`;
};

const sql_deleteIcon = (id) => {
  return `DELETE FROM icons WHERE id = ${id}`;
};

/**
 * ARTICLES
 */

const sql_getAllArticles = `SELECT * FROM articles`;

const sql_getOneArticle = (id) => {
  return `SELECT * FROM articles WHERE id = ${id}`;
};

const sql_deleteArticle = (id) => {
  return `DELETE FROM articles WHERE id = ${id}`;
};

// const sql_getAllMatchingTextblocks = (id) => {
//   return `SELECT * FROM textblocks WHERE parent_id = ${id}`;
// };

// const sql_updateArticleTitle = (title, id) => {
//   return `UPDATE articles SET title = '${title}' WHERE id = ${id}`;
// };

// const sql_updateMatchingTextblocks = (text, textOrder, id) => {
//   return `UPDATE textblocks SET text = '${text}', text_order = '${textOrder}'  WHERE parent_id = ${id}`;
// };

//////////////////////////

// const sql_postArticle = (title, content) => {
//   return `INSERT INTO articles(title, content) VALUES('${title}', [${content}])`;
// };

const sql_postArticle = (
  title,
  textBlocks,
  subtitles,
  photos,
  links,
  codeblocks
) => {
  return `INSERT INTO articles(title, textblocks, subtitles, photos, links, codeblocks)
  VALUES(
   '${title}',
   JSON_OBJECT('textBlocks',
     JSON_ARRAY(${textBlocks.map(
       (e) => `JSON_OBJECT('text','${e.text}', 'order','${e.order}')`
     )})),
   JSON_OBJECT('subtitles',
     JSON_ARRAY(${subtitles.map(
       (e) => `JSON_OBJECT('subtitle','${e.subtitle}', 'order','${e.order}')`
     )})),
   JSON_OBJECT('photos',
     JSON_ARRAY(${photos.map(
       (e) => `JSON_OBJECT('photo','${e.photo}', 'order','${e.order}')`
     )})),
   JSON_OBJECT('links',
     JSON_ARRAY(${links.map(
       (e) => `JSON_OBJECT('link','${e.link}', 'order','${e.order}')`
     )})),
   JSON_OBJECT('codeblocks',
     JSON_ARRAY(${codeblocks.map(
       (e) => `JSON_OBJECT('codeblock','${e.codeblock}', 'order','${e.order}')`
     )}))
 )`;
};

const sql_updateArticle = (
  title,
  textBlocks,
  subtitles,
  photos,
  links,
  codeblocks,
  id
) => {
  return `UPDATE articles SET
  title = '${title}', 
  textblocks = JSON_OBJECT('textBlocks',
  JSON_ARRAY(${textBlocks.map(
    (e) => `JSON_OBJECT('text','${e.text}', 'order','${e.order}')`
  )})),
  subtitles = JSON_OBJECT('subtitles',
  JSON_ARRAY(${subtitles.map(
    (e) => `JSON_OBJECT('subtitle','${e.subtitle}', 'order','${e.order}')`
  )})),
  photos = JSON_OBJECT('photos',
  JSON_ARRAY(${photos.map(
    (e) => `JSON_OBJECT('photo','${e.photo}', 'order','${e.order}')`
  )})),
  links = JSON_OBJECT('links',
  JSON_ARRAY(${links.map(
    (e) => `JSON_OBJECT('link','${e.link}', 'order','${e.order}')`
  )})),
  codeblocks = JSON_OBJECT('codeblocks',
  JSON_ARRAY(${codeblocks.map(
    (e) => `JSON_OBJECT('codeblock','${e.codeblock}', 'order','${e.order}')`
  )}))
  WHERE id = ${id}`;
};

export {
  sql_getCorrectUser,
  sql_getAllIcons,
  sql_getOneIcon,
  sql_postIcon,
  sql_deleteIcon,
  sql_updateIcon,
  //ARTICLES
  sql_getAllArticles,
  sql_getOneArticle,
  // sql_getAllMatchingTextblocks,
  // sql_updateArticleTitle,
  // sql_updateMatchingTextblocks,
  //////////////////////
  sql_postArticle,
  sql_updateArticle,
  sql_deleteArticle,
};
