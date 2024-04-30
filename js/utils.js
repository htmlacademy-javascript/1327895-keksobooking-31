const getRandomNumber = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
  const upper = Math.ceil(Math.max(Math.abs(minValue), Math.abs(maxValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomSubarray = (array, min, max) => {
  const count = getRandomNumber(min, max);
  const shuffledArray = [...array].sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
};

export { getRandomNumber, getRandomArrayElement, getRandomSubarray};
