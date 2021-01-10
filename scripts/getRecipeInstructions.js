// getRecipeInstructions.js

// Uses the URL for each recipe returned by Edamam to hit Spoonacular's Recipe Extract. Returns the extracted recipe steps.

"use strict";

const API_PATH3= "https://api.spoonacular.com/recipes/extract";

let apiResponse = sessionStorage.getItem("apiResponse");
apiResponseParsed =  JSON.parse(apiResponse);

function getRecipeInstructionsJS() {

    for (let i = 0; i < apiResponseParsed.hits.length; i++) {
        let recipeURL = apiResponseParsed.hits[i].recipe.url;
        let recipeTitle = apiResponseParsed.hits[i].recipe.label;
        console.log("URL for each returned recipe: " + i + "= " + recipeURL);
        console.log("recipe: " + i + "= " + recipeTitle);
        getRecipeInstructions(recipeURL);
    };     
    
    function getRecipeInstructions(recipeURL) {
        console.log(recipeURL);
        // Gets a bunch of recipes matching the keyword searched.
        let apiUrl3 = API_PATH3;
        let apiUrlExtension3 = "?url=" + recipeURL;  // edamam returned Recipe URL
        apiUrl3 += apiUrlExtension3 + API_APP_KEY3;

        // The Ajax query itself.
        $.ajax({
            url: apiUrl3,
            method: "GET"
        }).then(function(response) {
            if (response.instructions === null) {
                console.log("no steps for: " + response.title);
                return;
                }
            else {
                let recipeSteps = response.analyzedInstructions[0].steps;

                console.log(response);
                console.log("Cooking steps for:  " + response.title);
            
                for (let x = 0; x < recipeSteps.length; x++) {
                    console.log("Step " + recipeSteps[x].number +": " + recipeSteps[x].step);
                    }   
            }             
        });
    };
};