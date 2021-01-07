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
        console.log(response);
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



// Initialise modal event listener
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });


//Get Modal objects
var modRecipeNameObj = document.getElementById("modRecipeName");
var modRecipePicObj = document.getElementById("modRecipePic");
var modRecipeIngredientsObj = document.getElementById("modRecipeIngredients");
var modEmailObj = document.getElementById("modEmail");


//Add Email event listener for modal
modEmailObj.addEventListener("click", function(){
    sendEmail(modEmailObj.textContent,response.hits )         
});



function popModal(index){

    modRecipeNameObj.textContent = response.hits[index].recipe.label;
    modRecipePicObj.src = response.hits[index].recipe.image;
    modRecipeIngredientsObj.textContent = response.hits[index].ingredientLines;  
   
}


//Send User ingredients vias Gmail SMTP
function sendEmail(recipient, response) {

    console.log(recipient);
    console.log(response);

	Email.send({
	Host: "smtp.gmail.com",
	Username : "project1monash@gmail.com",
	Password : "epakqeohwuvlpxdm",
	To : recipient,
	From : "project1monash@gmail.com",
	Subject : "Your Recipe",
	Body : 
	
	"Thanks for using our recipe selection tool. Your recipe can be viewed at " + hit.recipe.uri +
	
	"Ingredients" +  hit.recipe.ingredientLines
		
	}).then(
		message => alert("Mail sent successfully - Please check your Junk Folder")
	);
}