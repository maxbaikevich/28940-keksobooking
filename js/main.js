'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_PRICE = 1000000;
var MIN_PRICE = 1000;
var COUNT_CARDS = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var MIN_GUESTS = 1;
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SCREEN_WIDTH = 1200;
var SCREEN_HEIGHT = 630;
var REFERENCE_POINT_HEIGHT = 130;
var PIN_HEIGHT = 70;
var PIN_WEIGHT = 50;

var copyPhotos = PHOTOS.slice();
function getRandomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomElementFromArray(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}
function generateData() {
  var x = getRandomIntegerFromInterval(0, SCREEN_WIDTH);
  var y = getRandomIntegerFromInterval(REFERENCE_POINT_HEIGHT, SCREEN_HEIGHT);
  var temp = {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntegerFromInterval(1, COUNT_CARDS) + '.png'
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: getRandomIntegerFromInterval(0, SCREEN_WIDTH) + ' , ' + getRandomIntegerFromInterval(REFERENCE_POINT_HEIGHT, SCREEN_HEIGHT),
      price: getRandomIntegerFromInterval(MIN_PRICE, MAX_PRICE),
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomIntegerFromInterval(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntegerFromInterval(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElementFromArray(CHECKINS),
      checkout: getRandomElementFromArray(CHECKOUTS),
      features: getRandomElementFromArray(FEATURES),
      description: '',
      photos: copyPhotos.sort(function () {
        return 0.5 - Math.random();
      })
    },
    location: {
      x: x,
      y: y
    }
  };
  return temp;
}
function generateOfferList() {
  var arr = [];
  for (var i = 0; i < COUNT_CARDS; i++) {
    arr.push(generateData(i));
  }
  return arr;
}

var listData = generateOfferList();
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var getCreatePins = function () {
  for (var i = 0; i < listData.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = listData[i].location.x - PIN_WEIGHT / 2 + 'px';
    element.style.top = listData[i].location.y + PIN_HEIGHT + 'px';
    element.querySelector('img').src = listData[i].author.avatar;
    mapPins.appendChild(element);
  }
};
getCreatePins();

var mapFiltersContainer = document.querySelectorAll('map__filters-container')[0];
var templateCard = document.querySelector('#card').content.querySelector('article');
var elementCard = templateCard.cloneNode(true);
var firstCard = listData[0];

var getCreateCards = function () {
  elementCard.querySelector('.popup__title').textContent = firstCard.offer.title;
  elementCard.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
  elementCard.querySelector('.popup__type').textContent = firstCard.offer.address;
  elementCard.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты' + ' для ' + firstCard.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + firstCard.offer.checkin + ' , ' + ' выезд ' + ' до ' + firstCard.offer.checkout;
  elementCard.querySelector('.popup__description').textContent = firstCard.offer.description;
  elementCard.querySelector('.popup__feature').textContent = firstCard.offer.features;
  elementCard.querySelector('.popup__text--address').textContent = firstCard.offer.address;

  var popapPhotos = elementCard.querySelector('.popup__photos');
  var popapPhoto = elementCard.querySelector('.popup__photo');

  var getCreatePhotos = function () {
    for (var j = 0; j < PHOTOS.length; j++) {
      var elementPhotos = popapPhoto.cloneNode(true);

      popapPhotos.appendChild(elementPhotos);
      elementCard.querySelector('.popup__photo').src = firstCard.offer.photos[j];
    }
    popapPhotos.removeChild(elementCard.querySelector('.popup__photo:nth-child(2)'));
  };
  getCreatePhotos();

  elementCard.querySelector('.popup__avatar').src = firstCard.author.avatar;

  var getType = function () {
    switch (firstCard.offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
    return firstCard.offer.type;
  };

  elementCard.querySelector('.popup__text--address').textContent = getType();

  map.insertBefore(elementCard, mapFiltersContainer);
};
getCreateCards();
