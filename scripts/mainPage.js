"use strict";
console.log("=== Loaded mainPage.js ===");
// Declare the part of the URL here that is going to be used to route the user
const RECIPE = '?recipe';
const FAV = '?fav';
const ABOUT_PAGE = '?about';

// The div to overwrite.
const CONTENT_MAIN = '#content-main';

//Init picture carousel

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems);
  });

  
  //var instance = M.Carousel.init({
  //  fullWidth: true
  //});

// Set a couple of variables for use.
let urlSearch;
let workingDiv;

function defaultAction(){
    // TODO no default set yet.
    // Causes loop :/
    // window.location.href = './index.html';
}

urlSearch = window.location.search;

// Check where the uer is trying to go and send them there if it exists.
if (urlSearch) {
    urlSearch = urlSearch.split("=");
    workingDiv = $(CONTENT_MAIN);

    // Display a specific recipe.
    switch(urlSearch[0]) {
        case RECIPE:
            workingDiv.empty();
            workingDiv.append(viewFavourite(urlSearch[1]));
            break;
        case FAV:
            workingDiv.empty();
            workingDiv.append(viewFavourites());
            break;
        case ABOUT_PAGE:
            workingDiv.empty();
            workingDiv.append(returnAbout());
            break;
        default:
        // TODO add in a notifier to the user their match cold not be found.
            defaultAction();
    }

} else {
    // Default to the main page - simply shows a couple of random images.
    defaultAction();
}
