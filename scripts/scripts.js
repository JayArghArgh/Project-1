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
    // change to number of recipes the api is returning in it's array (from default of 10 to 8);
    let numberOfRecipes = "&to=" + 8;  // change number of recipes returned here if need be
    apiUrl += apiUrlExtension + numberOfRecipes + API_APP_ID + API_APP_KEY;
    
    // The Ajax query itself.
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(response) {
        let recipeResult = $('#recipe-result');
        recipeResult.empty();

        //  clear the current cards from the div
        $('#random-recipes').empty();

        //Store response in session storage for use by other functions
        sessionStorage.setItem("apiResponse" , JSON.stringify(response));
        let apiResponse = sessionStorage.getItem("apiResponse");
        apiResponseParsed =  JSON.parse(apiResponse);

        // add an index number for each card generated
        let z=0;

        // add the recipe name to the results.
        response.hits.forEach(function(hit) {
            let listAnchor = $("<a>");
            let listItem = $('<p>');

            // some variable assignments added
            let recipeURL = hit.recipe.url;
            let recipePhoto = hit.recipe.image;
            let recipeName = hit.recipe.label;
            
            listAnchor.attr("href", recipeURL);
            listAnchor.attr("class", "recipe-link");
            listAnchor.attr("id", "")
            listAnchor.attr("alt", "recipe for " + hit.recipe.label)
            listItem.html(hit.recipe.label);
            listAnchor.append(listItem)
            recipeResult.append(listAnchor);

            // Generates display card.
            function generateCard() {
                let displayRow = $('#random-recipes');
                let newColumn = $('<div>');
                // Add new class for styling purposes.
                let newCard = $('<div>').attr('class', 'card recipe-card');
                newCard.attr("data-name", recipeName);
                newCard.attr("data-index", z);
                newCard.attr("id", "card-" + z);
                let cardImage = $('<div>');
                let recipeImage = $('<img>').attr('src', recipePhoto);
                let cardContent = $('<div>');
                let cardTitle = $('<span>').attr('class', 'card-title');
                
                recipeImage.attr("width", "100%");
                cardTitle.html("<quote>" + mainIngredient + "</quote>");
                
                cardContent.append(cardTitle);
                cardImage.append(recipeImage);
                // Added inline style to the heart btn to override the Materialize style setting for 'bottom' plus also moved Email button to here to be able to position card elements plus added style.
                cardImage.append('<a href ="#" class ="halfway-fab btn-floating pink pulse" style="bottom:0.5rem;"><i class="material-icons">favorite</i></a>');
                cardImage.append("<a class='waves-effect waves-light btn-small modal-trigger' style='position:absolute; bottom:0; left:0; display:inline-block;' onclick = 'popModal()' href='#modal1'><i class='material-icons left'>email</i>Email</a>");
                
                cardContent.append('<h4>' + recipeName + '</h4>');
               
                
                newCard.append(cardImage);
                newCard.append(cardContent);
                
                // Added two helper classes to assist with layout.
                newColumn.attr('class', 'col s12 m6 col-cards d-flex justify-center');
                newColumn.append(newCard);
                displayRow.append(newColumn);
                
                z++;
            }
          // Generate the card.
            generateCard();

        });
    });
};