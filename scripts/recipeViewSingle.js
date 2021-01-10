"use strict";
console.log("=== Loaded recipeViewSingle.js ===");

function viewSingleRecipe(recipeId) {
    // View a single recipe.
    // Set required variables
    let divRow = $('<div>').attr('class', 'container center');
    let emptyDiv = $('<div>').attr('class', 'col s0 m4 l4');
    let divCol = $('<div class="col 4">');

    // Set the API search path.
    let apiUrl = API_PATH;
    let apiUrlExtension = "?q=" + recipeId.split("_")[1];

    apiUrl += apiUrlExtension + API_APP_ID + API_APP_KEY;


    // The Ajax query itself.
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(response) {
        console.log(apiUrl);
        let qResult = response.hits[0];
        let cardLayout = $('<div class="card small single-recipe">');
        let cardImageDiv = $('<div class="card-image">');
        let cardImage = $('<img class="single-recipe-image">');
        let cardSpan = $('<span class="card-title">');
        let cardContent = '';
        let cardAction = '';
        let ingrUl = $('<ul class="collection">');
        let ingLink;
        let titleLink;
        let ingrImage;
        let ingrLi;
        let ingrSpan;


        console.log(qResult);
        qResult.recipe.ingredients.forEach(function (ingrItem) {

            // Setup the favourites link
            ingLink = $('<a>', {
                html: '<i class="material-icons">check</i>',
                title: 'Ingredient',
                class: 'secondary-content',
                href: '#'
            });

            // Setup the title link.
            titleLink = $('<a>', {
                html: ingrItem.text,
                href: '#'
            })

            ingrImage = $('<img alt="" class="circle">');
            ingrImage.attr('src', ingrItem.image)
            ingrLi = $('<li class="collection-item avatar">');
            ingrSpan = $('<span class="title">');
            ingrSpan.append(titleLink);
            ingrLi.append(ingrImage);
            ingrLi.append(ingrSpan);
            ingrLi.append(ingLink);
            ingrUl.append(ingrLi);

        });

        cardSpan.append(qResult.recipe.label);
        cardImage.attr('src', qResult.recipe.image);
        cardImageDiv.append(cardImage, cardSpan);
        cardLayout.append(cardImageDiv, cardContent, cardAction);
        divCol.append(cardLayout, ingrUl);

        divRow.append(emptyDiv);
        divRow.append(divCol);
        divRow.append(emptyDiv);
    });
    return divRow;
}