import translate from 'translate-google';

const getTranslate = (req, res) => {
  const { text, locale } = req.query;
  return translate(text, { to: locale })
    .then((t) => {
      res.status(200).send(t);
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send('');
    });
};
export default getTranslate;
