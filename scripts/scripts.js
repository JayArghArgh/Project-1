"use strict";
const API_APP_ID = "&app_id=7cfd493f";
const API_APP_KEY = "&app_key=e16c4ecac435fcb87d81e33ed0937f0f";
const API_PATH = "https://api.edamam.com/search";
let modIndex = 0;
let apiResponseParsed;

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
        //Store response in session storage for use by other functions
        sessionStorage.setItem("apiResponse" , JSON.stringify(response));
        let apiResponse = sessionStorage.getItem("apiResponse");
        apiResponseParsed =  JSON.parse(apiResponse);
        console.log(apiResponseParsed);
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


//-------------------------------------------------------------MODAL-------------------------------------------------------------------------//

//Get Modal objects
let modRecipeNameObj = document.getElementById("modRecipeName");
let modRecipePicObj = document.getElementById("modRecipePic");
let modRecipeIngredientsObj = document.getElementById("modRecipeIngredients");
let modNameInputObj = document.getElementById("modNameInput");
let modEmailInputObj = document.getElementById ("modEmailInput");
let modEmailBtnObj = document.getElementById("modEmailBtn");
let decIndexObj = document.getElementById("decIndex");
let incIndexObj = document.getElementById("incIndex");

// Add modal event listeners with callbacks

// Initialise modal event listener
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

//Add increment modal data index event listener
incIndexObj.addEventListener("click", function(){
    incModalIndex();         
});

//Add decrement modal data index event listener
decIndexObj.addEventListener("click", function(){
    decModalIndex();         
});

//Add Email event listener for modal
modEmailBtnObj.addEventListener("click", function(){

    if (modEmailBtnObj.value !== null || modEmailBtnObj.value !== undefined){    
        sendEmail();
    }   
    else{ 
        alert ("Enter a valid email you twat!")
    }

});

//Modal functions

//Increment modal index and populate modal
function incModalIndex(){

   // if (modIndex < (apiResponseParsed.hits.length - 1)){
        modIndex ++;
        popModal();
  //  }
    
}

//Decrement modal index and populate modal
function decModalIndex(){

  //  if (modIndex > 0){
        modIndex --;
        popModal();
  //  }
}

//Populate modal function
function popModal(){

    modRecipeNameObj.textContent = apiResponseParsed.hits[modIndex].recipe.label;
    modRecipePicObj.src = apiResponseParsed.hits[modIndex].recipe.image;
    modRecipeIngredientsObj.textContent = apiResponseParsed.hits[modIndex].recipe.ingredientLines;  
   
}

//-------------------------------------------------------------Send email functions-------------------------------------------------------------------------//

//Send User ingredients vias Gmail SMTP
function sendEmail() {   
    
	Email.send({
	Host: "smtp.gmail.com",
	Username : "project1monash@gmail.com",
	Password : "epakqeohwuvlpxdm",
	To : modEmailInputObj.value,
	From : "project1monash@gmail.com",
	Subject : "Your Recipe",
	Body : 
	
	"Hi " + modNameInputObj.value + "! Thanks for using our recipe selection tool. Your recipe can be viewed via the link @  : " + apiResponseParsed.hits[modIndex].recipe.uri + " " +
	
	"Ingredients : " +  apiResponseParsed.hits[modIndex].recipe.ingredientLines
		
	}).then(
		message => alert("Mail sent successfully - Please check your Junk Folder")
	);
}
