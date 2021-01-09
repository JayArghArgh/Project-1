"use strict";
console.log("=== Loaded viewFavourites.js ===");
// Declare the part of the URL here that is going to be used to route the user
const RECIPE = '?recipe';
const FAV = '?fav';

// Set a couple of variables for use.
let urlSearch;
let workingDiv;

urlSearch = window.location.search;

// Check where the uer is trying to go and send them there if it exists.
if (urlSearch) {
    urlSearch = urlSearch.split("=");
    workingDiv = $('#random-recipes');
    // Display a specific recipe.
    if (urlSearch[0] === RECIPE ) {
        workingDiv.empty();
        workingDiv.html("hello Justin");

    // Display the users favorites.
    } else if (urlSearch[0] === FAV) {
        workingDiv.empty();
        workingDiv.html("Favourites");
    }

} else {
    // Default to the main page - simply shows a couple of random images.
    let i = 0;
    while (i < MAX_RANDOMS) {
        getRandomRecipe();
        i++;
    }
}
