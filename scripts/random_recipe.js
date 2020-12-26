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
        let displayRow = $('#random-recipes');
        let randomColumn = $('<div>');
        let randomCard = $('<div>').attr('class', 'card');
        let cardImage = $('<div>');
        let recipeImage = $('<img>').attr('src', recipe.recipe.image);
        let cardContent = $('<div>');
        let cardTitle = $('<span>').attr('class', 'card-title');

        recipeImage.attr("width", "100%");

        cardTitle.html("<quote>" + recipe.recipe.label + "</quote>");

        cardContent.append(cardTitle);
        cardImage.append(recipeImage);
        cardImage.append('<a href ="#" class ="halfway-fab btn-floating pink pulse"><i class="material-icons">favorite</i></a>');

        cardContent.append('<h4>Fire Cracker Chicken Recipe</h4><p>This firecracker chicken recipe is chunks of crispy chicken tossed in a sweet and spicy sauce. An easy dinner option that the whole family will love!</p>');

        cardContent.append('<div class ="card-action"><a href ="https://www.dinneratthezoo.com/wprm_print/10393">Instructions</a><a href ="https://www.dinneratthezoo.com/wprm_print/10393">Ingredients</a></div>');


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