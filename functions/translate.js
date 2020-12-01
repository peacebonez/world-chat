require('dotenv').config();

const projectId = process.env.GOOGLE_PROJECT_ID;

const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId });

const translateText = async (text, language) => {
  const [translation] = await translate.translate(text, language);
  return translation;
};

module.exports = translateText;
