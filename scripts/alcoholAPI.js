"use strict";

const API_APP_KEY2 = "&apiKey=74f87b20cfd04c5aa17c1f09d672b5fa";
const API_APP_KEY3 = "&apiKey=c147831ac0e740369f586aebbffd9590"; // second API key for times when 402 error is returned
const API_APP_KEY4 = "&apiKey=12379bbb78244c0189010a85deb6a8e3"; // third API key for times when 402 error is returned

const API_PATH2= "https://api.spoonacular.com/food/wine/pairing";


function getWinePairing(mainIngredient) {
    // Gets a bunch of recipes matching the keyword searched.
    let apiUrl2 = API_PATH2;
    let apiUrlExtension2 = "?food=" + mainIngredient;
    let apiNumberOfResults = "&number=2";  // not needed in the call?
    apiUrl2 += apiUrlExtension2 + API_APP_KEY2;

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

            else {
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
            }
        });
    };

