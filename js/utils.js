const getRandomNumber = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
  const upper = Math.ceil(Math.max(Math.abs(minValue), Math.abs(maxValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFractionNumber = (minValue, maxValue) => {
  const lower = Math.min(minValue, maxValue);
  const upper = Math.max(minValue, maxValue);
  const range = upper - lower;

  const randomNumber = Math.random() * range + lower;
  return randomNumber.toFixed(5);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomSubarray = (array, min, max) => {
  const count = getRandomNumber(min, max);
  const shuffledArray = [...array].sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
};

export { getRandomNumber, getRandomArrayElement, getRandomSubarray, getRandomFractionNumber};
