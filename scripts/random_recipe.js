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
        let z = 0;
        let recipe = response.hits[randomRecipe];
        let recipeName = recipe.recipe.label;
        let displayRow = $('#random-recipes');
        let randomColumn = $('<div>');
        // added new class for styling purposes ------- start
        let randomCard = $('<div>').attr('class', 'card recipe-card');
        // added new class for styling purposes ------- end

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
        // changed text content below from recipeName to the search query-----------start
        cardTitle.html("<quote'>" + randomSearchTerm + "</quote>");
        // changed text content above from recipeName to the search query-----------end

        cardContent.append(cardTitle);
        cardImage.append(recipeImage);
        // added inline style to the heart btn to override the Materialize style setting for 'bottom' plus also moved Email button to here to be able to position card elements plus added style -------- start
        cardImage.append('<a href ="#" class ="halfway-fab btn-floating pink pulse" style="bottom:0.5rem;"><i class="material-icons">favorite</i></a>');
        cardImage.append("<a class='waves-effect waves-light btn-small modal-trigger' style='position:absolute; bottom:0; left:0; display:inline-block' onclick = 'popModal()' href='#modal1'><i class='material-icons left'>email</i>Email</a>");
        // added inline style to the heart btn to override the Materialize style setting for 'bottom' plus also moved Email button to here to be able to position card elements plus added style -------- end

        cardContent.append('<h4>' + recipeName + '</h4>');
        
        
        
        randomCard.append(cardImage);
        randomCard.append(cardContent);
        
        // added two helper classes to assist with layout ----- start
        randomColumn.attr('class', 'col s12 m6 col-cards d-flex justify-center');
        // added two helper classes to assist with layout ----- end
        randomColumn.append(randomCard);
        displayRow.append(randomColumn);
    });
};
 

// Return a couple rando's.
let i = 0;
while (i < MAX_RANDOMS) {
    getRandomRecipe();
    i++;
}