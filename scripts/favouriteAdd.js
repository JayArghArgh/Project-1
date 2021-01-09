"use strict";
console.log("=== Loaded addFavourites.js ===");

// Check for favourites. If favourites load them.
let storedFavourites = JSON.parse(localStorage.getItem("favourites"));
let userFavourites = [];

function updateFavourites(recipeItem) {
    // Add a new favourite and update local storage.
    let favouriteItem = apiResponseParsed.hits[recipeItem].recipe.uri;
    if (!userFavourites.includes(favouriteItem)) {
        // only do the updates if the item does not exist in the favourites array already.
        userFavourites.push(favouriteItem);
        localStorage.setItem("favourites", JSON.stringify(userFavourites));
    }
}

function viewFavourites() {
    // Present all favourites in a table format.
    // Set required variables.
    let favReturn = $('<row>');
    let favReturnTable = $('<table>');
    let favReturnLink;
    let tempTr;
    let tempTd;

    // Set the attributes.
    favReturn.attr('class', 's1 m4 l4');
    favReturnTable.attr('class', 'centered striped');
    favReturnTable.attr('border', '1px');

    // Set the table header.
    favReturnTable.append(
        '<thead><tr><th>Recipe</th><th>Remove</th><th>Share</th></tr></thead>'
    )

    // Loop through each favourite and append to table.
    storedFavourites.forEach(function (favItem){
        favReturnLink = $('<a>',{
            text: favItem,
            title: 'Your fav',
            href: favItem
        });

        console.log(favReturnLink);
        tempTr = $('<tr>');
        tempTd = $('<td>');

        tempTd.append(favReturnLink);

        tempTr.append(tempTd);
        tempTr.append('<td><td>');
        favReturnTable.append(tempTr);

    });

    // Append the table to the column and return.
    favReturn.append(favReturnTable);
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
    if (favouriteItem.getAttribute('class') && favouriteItem.getAttribute('class').includes('fav')) {
        console.log(favouriteItem.getAttribute('id'));
        updateFavourites(favouriteItem.getAttribute('id'));
    }
});
