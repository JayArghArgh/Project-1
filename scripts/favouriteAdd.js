"use strict";
console.log("=== Loaded addFavourites.js ===");

const ITEM_SEP = '~~~';

// Check for favourites. If favourites load them.
let storedFavourites = JSON.parse(localStorage.getItem("favourites"));
let userFavourites = [];
let recipeLink = "./index.html?recipe=";

function updateFavourites(recipeItem) {
    // Add a new favourite and update local storage.
    let favouriteItem;
    favouriteItem = apiResponseParsed.hits[recipeItem].recipe.uri;
    favouriteItem += ITEM_SEP;
    favouriteItem += apiResponseParsed.hits[recipeItem].recipe.label;
    favouriteItem += ITEM_SEP;
    favouriteItem += apiResponseParsed.hits[recipeItem].recipe.image;

    console.log(favouriteItem);
    if (!userFavourites.includes(favouriteItem)) {
        // only do the updates if the item does not exist in the favourites array already.
        userFavourites.push(favouriteItem);
        localStorage.setItem("favourites", JSON.stringify(userFavourites));
    }
}

function viewFavourites() {
    // Present all favourites in a table format.
    // Set required variables.
    let favReturn = $('<div class="container center">');
    let divCol = $('<div class="col s12 m4 l4">');
    let favUl = $('<ul class="collection">');
    let favLi;
    let favSpan;
    let favImg;
    let favReturnLink;
    let titleLink;

    // Loop through each favourite and append to table.
    storedFavourites.forEach(function (favItem){
        favItem = favItem.split(ITEM_SEP);

        // Setup the favourites link
        favReturnLink = $('<a>',{
            html: '<i class="material-icons">grade</i>',
            title: 'Your fav',
            class: 'secondary-content',
            href: recipeLink + favItem[0].split("#")[1]
        });

        // Setup the title link.
        titleLink = $('<a>', {
            html: '<h4>' + favItem[1] +'</h4>',
            href: recipeLink + favItem[0].split("#")[1]
        })

        favImg = $('<img alt="" class="circle">');
        favImg.attr('src', favItem[2])
        favLi = $('<li class="collection-item avatar">');
        favSpan = $('<span class="title">');
        favSpan.append(titleLink);
        // favContent = $('<p>'+ favItem[0] +'</p>');
        favLi.append(favImg);
        favLi.append(favSpan);
        // favLi.append(favContent);
        favLi.append(favReturnLink);
        favUl.append(favLi);
    });

    // Append the list to the column and return.
    divCol.append(favUl);
    favReturn.append(divCol);
    return favReturn;
}

// If favourites, initialise them.
if (storedFavourites) {
    userFavourites = storedFavourites;
}

// Listen for clicks to favourite button.
$('#random-recipes').click(function (event) {
    // event.preventDefault();
    let favouriteItem = event.target;
    if (favouriteItem.getAttribute('class').includes('fav-add')) {
        updateFavourites(favouriteItem.getAttribute('id'));
    }
});
