const projectId = "calm-inkwell-296922";

const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId });

const translateText = async (text, language) => {
  const [translation] = await translate.translate(text, language);
  return translation;
};

module.exports = translateText;
