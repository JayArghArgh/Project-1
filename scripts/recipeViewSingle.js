function viewSingleRecipe(recipeId) {
    // View a single recipe.
    // Set required variables
    let divRow = $('<div>').attr('class', 'row');
    let divCol = $('<div>').attr('class', 'col s12');

    divCol.html('<p>henlo ' + recipeId +'</p>');
    divRow.append(divCol);
    return divRow;
}