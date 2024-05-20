const temlateCard = document.querySelector('#card').content.querySelector('.popup');
// const mapCanvas = document.querySelector('#map-canvas');

const housingLabels = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const featuresLabels = {
  wifi: 'Wi-Fi',
  dishwasher: 'Посудомоечная машина',
  parking: 'Парковка',
  washer: 'Стиральная машина',
  elevator: 'Лифт',
  conditioner: 'Кондиционер',
};

const renderFeatures = (featuresList, features) => {
  features.forEach((featuresType) => {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature');
    featuresItem.classList.add(`popup__feature--${featuresType}`);
    featuresItem.textContent = featuresLabels[featuresType];
    featuresList.appendChild(featuresItem);
  });
};

const generatePopup = ({author, offer}) => {
  const popupFragment = document.createDocumentFragment();
  const popupElement = temlateCard.cloneNode(true);

  const titleElement = popupElement.querySelector('.popup__title');
  const addressElement = popupElement.querySelector('.popup__text--address');
  const priceElement = popupElement.querySelector('.popup__text--price');
  const housingElement = popupElement.querySelector('.popup__type');
  const timeElement = popupElement.querySelector('.popup__text--time');
  const capacityElement = popupElement.querySelector('.popup__text--capacity');
  const featuresList = popupElement.querySelector('.popup__features');
  const descriptionElement = popupElement.querySelector('.popup__description');
  const photosElement = popupElement.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  const avatarElement = popupElement.querySelector('.popup__avatar');

  titleElement.textContent = offer.title;
  addressElement.textContent = offer.address;
  priceElement.textContent = `${offer.price} ₽/ночь`;
  housingElement.textContent = housingLabels[offer.type];
  capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;


  featuresList.innerHTML = '';
  if(offer.features) {
    renderFeatures(featuresList, offer.features);
  }

  descriptionElement.innerHTML = '';
  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    descriptionElement.classList.add('hidden');
  }

  photosElement.innerHTML = '';

  offer.photos?.forEach((photo) => {
    const photoClone = photoElement.cloneNode(true);
    photoClone.src = photo;
    photosElement.appendChild(photoClone);
  });

  avatarElement.src = author.avatar;

  popupFragment.appendChild(popupElement);

  return popupFragment;
};

export { generatePopup };
