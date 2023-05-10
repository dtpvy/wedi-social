import translate from 'translate-google';

const getTranslate = (req, res) => {
  const text = req.query.text;
  return translate(text, { to: 'vi' })
    .then((t) => {
      res.status(200).send(t);
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send('');
    });
};
export default getTranslate;
