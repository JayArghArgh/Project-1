"use strict";

const API_APP_ID = "&app_id=7cfd493f";
const API_APP_KEY = "&app_key=e16c4ecac435fcb87d81e33ed0937f0f";
const API_PATH = "https://api.edamam.com/search";
let modIndex = 0;
let apiResponseParsed;


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

        //Store response in session storage for use by other functions
        sessionStorage.setItem("apiResponse" , JSON.stringify(response));
        let apiResponse = sessionStorage.getItem("apiResponse");
        apiResponseParsed =  JSON.parse(apiResponse);
        // add the recipe name to the results.
        response.hits.forEach(function(hit) {
            let listAnchor = $("<a>");
            let listItem = $('<p>');

            listAnchor.attr("href", hit.recipe.url);
            listAnchor.attr("class", "recipe-link");
            listAnchor.attr("id", "")
            listAnchor.attr("alt", "recipe for " + hit.recipe.label)
            listItem.html(hit.recipe.label);
            listAnchor.append(listItem)
            recipeResult.append(listAnchor);
        })
    });
}




