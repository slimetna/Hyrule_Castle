"use strict";
exports.__esModule = true;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
exports["default"] = { getRandomArbitrary: getRandomArbitrary, getRandomInt: getRandomInt };
