const API_APP_KEY2 = "&apiKey=74f87b20cfd04c5aa17c1f09d672b5fa";
const API_PATH2= "https://api.spoonacular.com/food/wine/pairing";


function getWinePairing(mainIngredient) {
    // Gets a bunch of recipes matching the keyword searched.
    let apiUrl2 = API_PATH2;
    let apiUrlExtension2 = "?food=" + mainIngredient;
    let apiNumberOfResults = "&number=2";
    let addNutrition = "&includeNutrition=true";
    apiUrl2 += apiUrlExtension2 + apiNumberOfResults + API_APP_KEY2 + addNutrition;

    // add the Spoonacular suggested Paired Wines to Spare div
    // The Ajax query itself.
    $.ajax({
        url: apiUrl2,
        method: "GET"
    }).then(function(response) {
            
            // create <ul> for list of paired wines and a pairing text explaining the match
            let spareDiv = $('#spare');
            spareDiv.empty();
            let spareDivList = $('<ul>');
            $(spareDiv).append($(spareDivList));
            
            // validating AJAX response (ie. in case there is no matching wine)
            if (response.status == "failure" || response.pairingText == "") {
                let winePairFail = "Could not find a wine pairing for " + mainIngredient;
                let newP = $('<p>');
                newP.html(winePairFail);
                spareDivList.append(newP);
            }
                        
            
            for (var ii = 0; ii < response.pairedWines.length; ii++) {
                let wineListItem = $('<li>');
                let wineListHeading = $('<h6>');
                let wineName = response.pairedWines[ii];
                // returning all lowercase wine names so will make first letter uppercase
                let wineFirstLetter = wineName.charAt(0);
                let wineWithCapitalFL = wineFirstLetter.toUpperCase();
                let wineNameCapitalFL = wineName.replace(wineFirstLetter, wineWithCapitalFL);
                // adding the list of paired wines to the div list
                wineListItem.append(wineListHeading);
                wineListHeading.html(wineNameCapitalFL);
                spareDivList.append(wineListItem);
            };
            // appending the wine pairing text after the list of wines 
            let wineListPara = $('<p>');
            wineListPara.html(response.pairingText);
            spareDivList.append(wineListPara);
        });
        
    };
    
    // Simple listener for our search button.
    $('#searchBtn').click(function (event) {
    let recipeObject;
    event.preventDefault();
    // When clicked, grab the keyword and send it to the API for a search.
    recipeObject = $('#keyword').val();
    getWinePairing(recipeObject);
});

// Listeners for quick links -- simplify in the future perhaps via addEventListener
$("#ql1").click(function () {
    const ql1Text = $("#ql1").html();
    getWinePairing(ql1Text);
});
$("#ql2").click(function () {
    const ql2Text = $("#ql2").html();
    getWinePairing(ql2Text);
});
$("#ql3").click(function () {
    const ql3Text = $("#ql3").html();
    getWinePairing(ql3Text);
});
$("#ql4").click(function () {
    const ql4Text = $("#ql4").html();
    getWinePairing(ql4Text);
});
$("#ql5").click(function () {
    const ql5Text = $("#ql5").html();
    getWinePairing(ql5Text);
});
$("#ql6").click(function () {
    const ql6Text = $("#ql6").html();
    getWinePairing(ql6Text);
});
$("#ql7").click(function () {
    const ql7Text = $("#ql7").html();
    getWinePairing(ql7Text);
});
$("#ql8").click(function () {
    const ql8Text = $("#ql8").html();
    getWinePairing(ql8Text);
});

