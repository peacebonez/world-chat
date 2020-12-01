const generateTimestamp = (_) => {
  const now = new Date();
  const createdOn = {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
  return createdOn;
};

module.exports = generateTimestamp;
