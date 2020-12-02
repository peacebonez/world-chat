require('dotenv').config();

const projectId = process.env.GOOGLE_PROJECT_ID;

const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId });

const translateText = async (text, language) => {
  if (language === 'English') language = 'en';
  if (language === 'Spanish') language = 'es';
  if (language === 'French') language = 'fr';
  const [translation] = await translate.translate(text, language);
  return translation;
};

module.exports = translateText;
