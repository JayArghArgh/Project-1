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
    let favUl = $('<ul class="collection">');
    let favLi;
    let favSpan;
    let favImg;
    let favContent;
    let favReturn = $('<row>');
    let favReturnLink;

    // Set the attributes.
    favReturn.attr('class', 's12');

    // Loop through each favourite and append to table.
    storedFavourites.forEach(function (favItem){
        favItem = favItem.split(ITEM_SEP);

        favReturnLink = $('<a>',{
            html: '<i className="material-icons">grade</i>',
            title: 'Your fav',
            class: 'secondary-content',
            href: recipeLink + favItem[0].split("#")[1]
        });
        favImg = $('<img alt="" class="circle">');
        favImg.attr('src', favItem[2])
        favLi = $('<li class="collection-item avatar">');
        favSpan = $('<span class="title">');
        favSpan.html(favItem[1]);
        favContent = $('<p>'+ favItem[0] +'</p>');

        favLi.append(favImg);
        favLi.append(favSpan);
        favLi.append(favContent);
        favLi.append(favReturnLink);
        favUl.append(favLi);
    });

    // Append the list to the column and return.
    favReturn.append(favUl);
    return favReturn;
}


function viewFavourite(favId) {
    // View a single recipe.
    // Set required variables
    let favReturn;
    favReturn = "henlo " + favId;
    return favReturn;
}

// If favourites, initialise them.
if (storedFavourites) {
    userFavourites = storedFavourites;
}

// Listen for clicks to favourite button.
$('#random-recipes').click(function (event) {
    event.preventDefault();
    let favouriteItem = event.target;
    if (favouriteItem.getAttribute('class').includes('fav-add')) {
        updateFavourites(favouriteItem.getAttribute('id'));
    }
});
