const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 10;
const MAX_COUNT_PHOTO = 3;
const MIN_PRICE = 3000;
const MAX_PRICE = 10000;



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
]

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
]

const  DESCRIPTION = [
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

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const getRandomNumber = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
  const upper = Math.ceil(Math.max(Math.abs(minValue), Math.abs(maxValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};



const createOffer = {
  title: getRandomArrayElement(TITLE),
  address: '', // создается как location,
  price: '', //, 'случайное целое положительное число',
  type: '' ,// одно из FEATURES',
  rooms: '', //'количество комнат. Случайное целое положительное число',
  guests: 'количество гостей, которое можно разместить. Случайное целое положительное число.',
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: getRandomArrayElement(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: '', // случайное количество от одного до трех фото
};



const createIdAvatar = () => {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
}

const createAdvertisement = () => {
  autor: `img/avatars/user${createIdAvatar(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.png`,
  offer:'',
  location: '',
};
