const temlateCard = document.querySelector('#card').content.queryselector('.popup');


const generatePopup = (offer) => {
  const popupElement = temlateCard.cloneNode(true);

  const titleElement = popupElement.querySelector('.popup__title');
  const addressElement = popupElement.querySelector('.popup__text--address');
  const priceElement = popupElement.querySelector('.popup__text--price');
  const housingElement = popupElement.querySelector('.popup__type');
  const housingLabels = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const timeElement = popupElement.querySelector('.popup__text--time');
  const capacityElement = popupElement.querySelector('.popup__text--capacity');
  const featuresList = popupElement.querySelector('.popup__features');

  const featuresLabels = {
    wifi: 'Wi-Fi',
    dishwasher: 'Посудомоечная машина',
    parking: 'Парковка',
    washer: 'Стиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер',
  };

  titleElement.textContent = offer.title;
  addressElement.textContent = offer.address;
  priceElement.textContent = `${offer.price} ₽/ночь`;
  housingElement.textContent = housingLabels[offer.type];


  capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  offer.features.forEach((feature) => {

    const featuresItem = createElement('li', 'popup__feature');
    featuresItem.classList.add('popup__feature--' + featuresLabels);
    featuresList.appendChild(featuresItem);
  });
  featuresElement.textContent = {

  }

}
