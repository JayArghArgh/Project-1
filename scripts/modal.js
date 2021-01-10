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

    if (modEmailInputObj.value !== ""){    
        sendEmail();
    }   
    else{ 
        alert ("Enter a valid email please")
    }
});


//Modal functions

//Increment modal index and populate modal
function incModalIndex(){
   if (modIndex < (apiResponseParsed.hits.length - 1)){
        modIndex ++;
        popModalIngredients();
    }
}


//Decrement modal index and populate modal
function decModalIndex(){
    if (modIndex > 0){
        modIndex --;
        popModalIngredients();
    }
}


//Populate modal function for the first time
function popModal(){

    popModalIngredients();
    popModalWine();   
   
}

// Populate modal with updated ingredients
function popModalIngredients(){

 //Add recipe heading from api
 modRecipeNameObj.textContent = apiResponseParsed.hits[modIndex].recipe.label;
 //Add recipe image from api
 modRecipePicObj.src = apiResponseParsed.hits[modIndex].recipe.image;
 //Get table objext from id
 let table = document.getElementById("modRecipeIngredients");

 //If table already created delete     
 //Remove old table body and wine pairing if there
 document.getElementsByTagName("tbody")[0].remove();

 //Create ingredients table
 let ingTableBody = document.createElement('tbody');
 ingTableBody.setAttribute("id", "modRecipeIngredients");
 document.getElementById("modTablHead").appendChild(ingTableBody);


 //Loop through ingredients and make table from current ingredients list
 for (let x=0; x < apiResponseParsed.hits[modIndex].recipe.ingredients.length; x++) { 
     let ingRow = ingTableBody.insertRow(x);
     let ingCell1 = ingRow.insertCell(0);
     ingCell1.innerHTML = apiResponseParsed.hits[modIndex].recipe.ingredients[x].text;
 }
 
 //Remove old methosd table
 document.getElementsByTagName("tbody")[1].remove();
 //Create ingredientws table
 let methTableBody = document.createElement('tbody');
 methTableBody.setAttribute("id", "modRecipeMethod");
 document.getElementById("modInsHead").appendChild(methTableBody);

 //Loop through method / steps to create method table
 for (let y=0; y < recipeInstructionsParsed.analyzedInstructions[0].steps.length; y++) { 
    let methRow = methTableBody.insertRow(y);
    let methCell1 = methRow.insertCell(0);
    methCell1.innerHTML = recipeInstructionsParsed.analyzedInstructions[0].steps[y].number + " - " + recipeInstructionsParsed.analyzedInstructions[0].steps[y].step;
}

}


// Populate modal with wine pairing
function popModalWine(){


   for (let y = 0; y < winePairing.length; y++) {
        const newH4 = document.createElement("h4");
        const newContent = document.createTextNode(winePairing[y]);
        newH4.appendChild(newContent);
        document.getElementById("wineHeading").appendChild(newH4); 
    }

}

