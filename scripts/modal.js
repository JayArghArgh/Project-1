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
   if (modIndex < (apiResponseParsed.hits.length - 1)){
        modIndex ++;
        popModal();
    }
}

//Decrement modal index and populate modal
function decModalIndex(){
    if (modIndex > 0){
        modIndex --;
        popModal();
    }
}

//Populate modal function
function popModal(){

    //Add recipe heading from api
    modRecipeNameObj.textContent = apiResponseParsed.hits[modIndex].recipe.label;
    //Add recipe image from api
    modRecipePicObj.src = apiResponseParsed.hits[modIndex].recipe.image;
    //Get table objext from id
    let table = document.getElementById("modRecipeIngredients");
    //If table already created delete
    let totalRowCount = table.rows.length
        
    document.getElementsByTagName("tbody")[0].remove();
    let tableBody = document.createElement('tbody');
    tableBody.setAttribute("id", "modRecipeIngredients");
    document.getElementById("modTablHead").appendChild(tableBody);

    //Loop through ingredients and make table from current ingredients list
    for (let x=0; x < apiResponseParsed.hits[modIndex].recipe.ingredients.length; x++) { 
        let row = tableBody.insertRow(x);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = apiResponseParsed.hits[modIndex].recipe.ingredients[x].text;
    }
}