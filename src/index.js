// src/index.js

import createBanner from "./banner.js";

import "./index.css";

import ParcelImg from "./parcel-logo.png";

const createElement = () => {
  const element = document.createElement("a");
  element.href = "https://parceljs.org/";
  element.classList = "parcel";
  element.target = "_blank";
  return element;
};

const createImage = image => {
  const imageElement = new Image();
  imageElement.src = image;
  imageElement.classList = "parcel-img";
  return imageElement;
};

const main = createElement();

document.body.appendChild(main);

main.appendChild(createBanner());
main.appendChild(createImage(ParcelImg));

if (module.hot) {
  module.hot.dispose(function() {
    window.location.reload();
  });
}
