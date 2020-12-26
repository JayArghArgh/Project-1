"use strict";
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
        let recipe = response.hits[randomRecipe];
        console.log(recipe);
        let displayRow = $('#random-recipes');
        let randomColumn = $('<div>');
        let randomCard = $('<div>').attr('class', 'card');
        let cardImage = $('<div>');
        let recipeImage = $('<img>').attr('src', recipe.recipe.image);
        let cardContent = $('<div>');
        let cardTitle = $('<span>').attr('class', 'card-title');

        cardTitle.text("<h1>" + recipe.recipe.label + "</h1>");

        cardContent.append(cardTitle);
        cardImage.append(recipeImage);
        randomCard.append(cardImage);
        randomCard.append(cardContent);

        randomColumn.attr('class', 'col s12 l6');
        randomColumn.append(randomCard);
        displayRow.append(randomColumn);
    });
}

// Return a couple rando's.
let i = 0;
while (i < MAX_RANDOMS) {
    getRandomRecipe();
    i++;
}