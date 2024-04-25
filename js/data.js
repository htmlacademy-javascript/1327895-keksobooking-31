import { getRandomNumber, getRandomArrayElement,getRandomSubarray } from './utils.js';

const NUMBER_ADS = 10;

const MAX_COUNT_PHOTO = 3;

const MIN_PRICE = 3000;
const MAX_PRICE = 10000;

const MAX_COUNT_FEATURES = 6;

const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 5;
const MIN_COUNT_GUETS = 1;
const MAX_COUNT_GUETS = 5;

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLE = [
  'Уютная комната в самом центре города',
  'Комната в пешей доступности от метро',
  'Комната в квартире с видом на море',
  'Квартира в престижном районе',
  'Сдается квартира с видом на реку',
  'Комната с доступом в интернет',
  'Квартира в аренду с панорамными окнами',
  'Квартира с видом на реку',
  'Комната в тихом районе',
  'Квартира в аренду в элитном жилом комплексе',
];

const DESCRIPTION = [
  'Светлая и удобная комната с рабочим столом и балконом',
  'Ретро-стильная комната с винтажной мебелью и фотографиями из прошлого века',
  'Приглушенный интерьер с теплыми оттенками и деревянными элементами',
  'Роскошная комната с балконом и отдельной гостиной',
  'Просторная и светлая комната с панорамными окнами',
  'Очень уютная комната с видом на море',
  'Лофт-стильная комната с высокими потолками и кирпичными стенами',
  'Оригинальная комната с необычным освещением и креативным декором',
  'Мини-спа номер с джакузи и хамамом для полного расслабления',
  'Горный стиль номера с деревянными балками и камином'
];

const createLatMin = () => getRandomNumber(LAT_MIN, LAT_MAX).toFixed(5);
const createLatMax = () => getRandomNumber(LNG_MIN, LNG_MAX).toFixed(5);

const createOffer = () => ({
  title: getRandomArrayElement(TITLE),
  address: {
    lat: createLatMin(),
    lng: createLatMax(),
  },
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomNumber(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
  guests: getRandomNumber(MIN_COUNT_GUETS, MAX_COUNT_GUETS),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: getRandomSubarray(FEATURES, 0, MAX_COUNT_FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getRandomSubarray(PHOTOS, 0, MAX_COUNT_PHOTO),
});

const createId = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

const createIdAvatar = createId();

const createAdvertisement = () => ({
  autor: {
    avatar: `img/avatars/user${((createIdAvatar() % 10) + 1).toString().padStart(2, '0')}.png`,
  },
  offer: createOffer(),
  location: {
    lat: createLatMin(),
    lng: createLatMax(),
  },
});

const generateArray = () => {
  const array = [];
  for (let i = 0; i < NUMBER_ADS; i++) {
    array.push(createAdvertisement(i));
  }
  return array;
};

export { generateArray };
