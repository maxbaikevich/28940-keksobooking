'use strict';
var TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPES = ['palace', 'flat', 'house','bungalo'];
var MAX_PRICE =  1000000;
var MIN_PRICE =  1000;
var COUNT_CARDS = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var SCREEN_WIDTH = 1200;
var SCREEN_HEIGHT = 630;
var REFERENCE_POINT_HEIGHT = 130;

function getRandomIntegerFromInterval(min, max){
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
        avatar: "img/avatars/user0" + getRandomIntegerFromInterval(1, COUNT_CARDS) + ".png"
      },
      offer: {
        title: getRandomElementFromArray(TITLES),
        address: getRandomIntegerFromInterval(0, SCREEN_WIDTH) + ' , ' + getRandomIntegerFromInterval(REFERENCE_POINT_HEIGHT, SCREEN_HEIGHT),
        price: getRandomIntegerFromInterval(MIN_PRICE, MAX_PRICE),
        type: getRandomElementFromArray(TYPES),
        rooms: getRandomIntegerFromInterval(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomIntegerFromInterval(MIN_ROOMS, MAX_ROOMS),
        checkin: getRandomElementFromArray(CHECKINS),
        checkout: getRandomElementFromArray(CHECKOUTS),
        features: getRandomElementFromArray(FEATURES),
        description:'',
        photos: getRandomElementFromArray(PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
    return temp;
}
    var arr = [];
for (var i = 0; i < COUNT_CARDS; i++) {
  arr.push(generateData());
}
