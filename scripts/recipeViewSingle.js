"use strict";
console.log("=== Loaded recipeViewSingle.js ===");

function viewSingleRecipe(recipeId) {
    // View a single recipe.
    // Set required variables
    let divRow = $('<div>').attr('class', 'container center');
    let emptyDiv = $('<div>').attr('class', 'col s0 m4 l4');
    let divCol = $('<div>').attr('class', 'col s12 m4 l4');

    // Set the API search path.
    let apiUrl = "r=" + API_PATH;
    let apiUrlExtension = "?" + recipeId.split("_")[1];

    apiUrl += apiUrlExtension + API_APP_ID + API_APP_KEY;


    // The Ajax query itself.
    $.ajax({
        url: "https://api.edamam.com/search?q=54197d5c51861eb539d4a8c2f59efbc8" + API_APP_ID + API_APP_KEY ,
        method: "GET"
    }).then(function(response) {
        let qResult = response.hits[0];

        let cardLayout = $('<div class="card">');
        let cardImageDiv = $('<div class="card-image single-recipe">');
        let cardImage = $('<img>');
        let cardSpan = $('<span class="card-title">');
        let cardContent = '<p>card content my homie</p>';
        let cardAction = '<a href="#">This is a link</a>';

        console.log(qResult);
        cardSpan.append(qResult.recipe.label);
        cardImage.attr('src', qResult.recipe.image);
        cardImageDiv.append(cardImage, cardSpan);
        cardLayout.append(cardImageDiv, cardContent, cardAction);
        divCol.append(cardLayout);

        divRow.append(emptyDiv);
        divRow.append(divCol);
        divRow.append(emptyDiv);
    });
    return divRow;
}