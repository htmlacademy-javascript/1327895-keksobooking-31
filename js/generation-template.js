const temlateCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

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

const renderPhotos = (photosElement, photos) => {
  photos.forEach((photo) => {
    const img = document.createElement('img');
    img.src = photo;
    photosElement.appendChild(img);
  });
};

const generatePopup = (data) => {
  const popapFragment = document.createDocumentFragment();

  data.forEach(({author, offer}) => {
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
    const avatarElement = popupElement.querySelector('.popup__avatar');

    titleElement.textContent = offer.title;
    addressElement.textContent = offer.address;
    priceElement.textContent = `${offer.price} ₽/ночь`;
    housingElement.textContent = housingLabels[offer.type];
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    renderFeatures(featuresList, offer.features);

    descriptionElement.innerHTML = '';

    if (offer.description) {
      descriptionElement.textContent = offer.description;
    } else {
      descriptionElement.classList.add('hidden');
    }

    photosElement.innerHTML = '';
    renderPhotos(photosElement, offer.photos);

    avatarElement.src = author.avatar;

    popapFragment.appendChild(popupElement);
  });

  mapCanvas.appendChild(popapFragment);
};

export { generatePopup };
