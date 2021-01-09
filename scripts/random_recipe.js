"use strict";
console.log("=== Loaded random_recipe.js ===");
const MAX_RANDOMS = 2;
const KEYWORDS = ['beef', 'chicken', 'pork', 'vegetarian', 'smoothies', 'vegan', 'salad', 'dessert'];

function getRandomRecipe() {
    // Returns a random recipe based on the keywords array. Can have more 'randomisation' built in.
    let apiUrl = API_PATH;
    let randomSearchTerm = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
    let apiUrlExtension = "?q=" + randomSearchTerm;
    let randomRecipe = Math.floor(Math.random() * 9);

    // Build the URL
    apiUrl += apiUrlExtension + API_APP_ID + API_APP_KEY;

    // The Ajax query itself.
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(response) {
        let z = 0;
        let recipe = response.hits[randomRecipe];
        let recipeName = recipe.recipe.label;
        let displayRow = $('#random-recipes');
        let randomColumn = $('<div>');
        let randomCard = $('<div>').attr('class', 'card');
        // new code adding data-name and data-index below------------------start
        randomCard.attr("data-index", z);
        randomCard.attr("data-name", recipeName);
        randomCard.attr("id", "card-" + z);
        // data-name and data-index finish---------------------------------finish
        let cardImage = $('<div>');
        let recipeImage = $('<img>').attr('src', recipe.recipe.image);
        let cardContent = $('<div>');
        let cardTitle = $('<span>').attr('class', 'card-title');
        // new code below neeed to grab recipe summary later-----------------------start
        let recipeURL = recipe.recipe.url;
        // new code for recipe summary finish-----------------------------------finish

        console.log(recipeURL);

        recipeImage.attr("width", "100%");

        cardTitle.html("<quote>" + recipe.recipe.label + "</quote>");

        cardContent.append(cardTitle);
        cardImage.append(recipeImage);
        cardImage.append('<a href ="#" class ="halfway-fab btn-floating pink pulse"><i class="material-icons">favorite</i></a>');

        cardContent.append('<h4>' + recipeName + '</h4>');

        cardContent.append("<a class='waves-effect waves-light btn-small modal-trigger' onclick = 'popModal()' href='#modal1'><i class='material-icons left'>email</i>Email</a>");


        randomCard.append(cardImage);
        randomCard.append(cardContent);

        randomColumn.attr('class', 'col s12 m6 col-cards');
        randomColumn.append(randomCard);
        displayRow.append(randomColumn);
    });
};


