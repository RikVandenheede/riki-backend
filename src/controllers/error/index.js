const get404 = (req, res) => {
  res.status(404).send([{ error: "pagina niet gevonden!" }]);
};

export { get404 };
