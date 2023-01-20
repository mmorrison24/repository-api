module.exports = handler => async (req, res) => {
  const response = await handler(req);
  if (!response) res.status(204).send();
  else res.json(response);
};
