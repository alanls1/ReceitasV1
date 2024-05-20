

"use strict";

window.ACCESS_POINT = "";
const APP_ID = "";
const API_KEY = "";
const TYPE = "";

// @para {Array} queries Query array
// @para {function} successCallback

export const fechData = async function (queries, successCallback) {
  console.log(queries);
  const query = queries
    ?.join("&")
    .replace(/,/g, "=")
    .replace(/ , /g, "&20")
    .replace(/ \+ /g, "%2B");

  console.log(query);
  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}&${
    query ? `${query}` : ""
  }`;
  
  const response = await fetch(url);

  if (response.ok) {
  const data = await response.json();
     successCallback(data);
   }
};
