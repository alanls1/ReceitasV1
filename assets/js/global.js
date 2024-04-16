/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";
import { fechData } from "./api.js";

// @param { NodeList } $elements NodeList
// @param { String } eventType Event Type string
// @param { Function } callback Callback Function

window.addEventOnElements = ($elements, eventType, callback) => {
  for (const elements of $elements) {
    elements.addEventListener(eventType, callback);
  }
};

export const cardQueries = [
  ["field", "uri"],
  ["field", "label"],
  ["field", "image"],
  ["field", "totalTime"],
];

// skeleton card

export const $skeletonCard = `
    <div class="card skeleton-card">
        <div class="skeleton card-banner"></div>
        <div class="card-body">
            <div class="skeleton card-title"></div>
            <div class="skeleton card-text"></div>
        </div>
    </div>
`;

const ROOT = "https://api.edamam.com/api/recipes/v2";

window.saveRecipe = function (elements, recipeId) {
  const isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);

  ACCESS_POINT = `${ROOT}/${recipeId}`;
  if (!isSaved) {
    fechData(cardQueries, function (data) {
      window.localStorage.setItem(
        `cookio-recipe${recipeId}`,
        JSON.stringify(data)
      );

      elements.classList.toggle("saved");
      elements.classList.toggle("removed");

      showNotification("Added to Recipe book");
    });
    ACCESS_POINT = ROOT;
  } else {
    window.localStorage.removeItem(`cookio-recipe${recipeId}`);
    elements.classList.toggle("saved");
    elements.classList.toggle("removed");
    showNotification("Remove from Recipe book");
  }
};

const $snackBarContainer = document.createElement("div");

$snackBarContainer.classList.add("snackbar-container");
document.body.appendChild($snackBarContainer);

function showNotification(message) {
  const $snackBar = document.createElement("div");
  $snackBar.classList.add("snackbar");
  $snackBar.innerHTML = `<p class="body-medium">${message}</p>
  `;
  $snackBarContainer.appendChild($snackBar);
  $snackBar.addEventListener("animationend", (e) => {
    $snackBarContainer.removeChild($snackBar);
  });
}
