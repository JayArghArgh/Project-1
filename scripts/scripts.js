"use strict";
const API_APP_ID = "&app_id=7cfd493f";
const API_APP_KEY = "&app_key=e16c4ecac435fcb87d81e33ed0937f0f";
const API_PATH = "https://api.edamam.com/search";

// Place these next two lines in the index file before the </body>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
// <script type="text/javascript" src="scripts/scripts.js"></script>

function getRecipe(mainIngredient) {
    // Gets a bunch of recipes matching the keyword searched.
    let apiUrl = API_PATH;
    let apiUrlExtension = "?q=" + mainIngredient;
    apiUrl += apiUrlExtension + API_APP_ID + API_APP_KEY;

    // The Ajax query itself.
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(response) {
        let recipeResult = $('#recipe-result');
        recipeResult.empty();
        // add the recipe name to the results.
        response.hits.forEach(function(hit) {
            let listItem = $('<p>');
            listItem.html(hit.recipe.label);
            recipeResult.append(listItem);
        })
    });
}

// Simple listener for our search button.
$('#searchBtn').click(function (event) {
    let recipeObject;
    event.preventDefault();
    // When clicked, grab the keyword and send it to the API for a search.
    recipeObject = $('#keyword').val();
    getRecipe(recipeObject);
});