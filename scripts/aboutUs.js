"use strict";
console.log("=== Loaded aboutUs.js ===");

// Returns a simple about us page.
function returnAbout(){
    let divRow = $('<div class="row">');
    let divCol = $('<div className="col s12 m12 l12 center">');
    let divContainer = $('<div class="black-text">');

    // Line em all up.
    divContainer.append('<h1>About Us</h1>');
    divContainer.append('<p class="blue-grey-text">We are a group of food enthusiasts who enjoy experimenting with food. We love cooking, baking, hosting our friends and family and creating warm and fun experiences during  meal times.</p>');
    divContainer.append('<p>We would love to share our favourites and go to meals with you, so stay tuned there will be more resources available soon.</p>');
    divContainer.append('<p>In the meantime please subscribe and share our page.</p>');

    // Knock em all down.
    divCol.append(divContainer);
    divRow.append(divCol);

    return divRow;
}