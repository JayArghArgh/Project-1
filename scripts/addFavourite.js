"use strict";
console.log("=== Loaded addFavourites.js ===");

// Check for favourites. If favourites load them.
let storedFavourites = JSON.parse(localStorage.getItem("favourites"));
let userFavourites = [];
let clickedItemId;

function updateFavourites(favouriteItem) {
    // Add a new favourite and update local storage.
    if (!userFavourites.includes(favouriteItem)) {
        // only do the updates if the item does not exist in the favourites array already.
        userFavourites.push(favouriteItem);
        localStorage.setItem("favourites", JSON.stringify(userFavourites));
    }
}

// If favourites, initialise them.
if (storedFavourites) {
    userFavourites = storedFavourites;
}

// Listen for clicks to favourite button.
$('#random-recipes').click(function (event) {
    clickedItemId = userFavourites.length;  // Replace this with the favourite ID.
    event.preventDefault();
    // let favouriteItem = event.target;
    updateFavourites(clickedItemId);
});


// if user clicks favourites menu update the main div with the favourites. leave the search form present for the user.