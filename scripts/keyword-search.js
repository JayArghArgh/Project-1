"use strict";
// script for keyword search

// Create search favorites array from local storage

// Make array
let userKeywordArray = ['beef', 'chicken', 'pork', 'vegetarian', 'smoothies', 'vegan', 'salad', 'dessert'];
let keywordList = $("#recipeQuicklinks");


initKeywordList();

function initKeywordList() {
    // Get stored search list from localStorage
    // Parsing the JSON string to an object
    let storedKeywordList = JSON.parse(localStorage.getItem("keywords"));

    if (storedKeywordList === null || storedKeywordList === undefined) {
        storeKeyword();
    } else {

        // If Keywords were retrieved from localStorage, update the userKeywordsArray array to it
        if ((storedKeywordList !== null  || storedKeywordList === undefined) && storedKeywordList.length > 0) {
            userKeywordArray = storedKeywordList;
        } else if (storedKeywordList.length == 0) {
            localStorage.removeItem("keywords");
        }
        // Render keywords to the DOM
        storeKeyword();
    }
    renderKeywordList();
    renderQuicklinks();
}

// Function to fill the list of keywords searched
function renderKeywordList() {
    
    // Delete the list of keywords prior to adding new keywords list data 
    // (necessary to prevent repeat of recipes data)
    let searchList = $("#recipeQuicklinks");
    $(searchList).empty();
    
    // Loop through the array of keywords
    // Note: using index = zero for numbering the quicklink id
    for (let i = 0; i < userKeywordArray.length; i++) {
        let newLI = $("<li>");
        let newLink = $("<a>");

        let iconSubtract = $("<i>");
        iconSubtract.attr("class", "material-icons");
        iconSubtract.text("remove_circle_outline");
        iconSubtract.attr("id", "removeBtn");
        
        let button = $("<a>");
        button.attr("class", "btn-floating btn-small waves-effect waves-light red iconAnchor");
        button.append(iconSubtract);
        
        newLink.attr("href", "#");
        newLink.attr("id", "ql" + (i));
        newLink.attr("class", "saved-keywords");

        newLink.text(userKeywordArray[i]);
        
        newLI.attr("data-name", userKeywordArray[i]);
        newLI.attr("data-index", i);
        newLI.attr("class", "keywords-list-item clearfix");
        newLI.append(newLink);
        newLI.append(button);
        searchList.append(newLI);
    }
};




function storeKeyword() {
    // Stringify and set "keywords" key in localStorage to  array
    localStorage.setItem("keywords", JSON.stringify(userKeywordArray));   
}

$('#searchFormID')
$('#searchBtnDiv')
$('#searchBtn')


// SEARCH BOX INPUT

let keywordSearch;
let keyword = "";
let keywordID = $('#keywordID');
let keywordIDtop = $('#keywordIDtop');

function getKeyword(keywordEvent) {
    // event.preventDefault();

    // When clicked, grab the keyword and send it to the API for a search.

    // This grabs text from the input box
    keyword = keywordEvent[0].value;
    keyword = keyword.trim();
    
    // Return from function early if keyword search is blank
    // Change alert to a modal?? or some other warning //
    if (keyword === "") {
        // TODO START REMOVE ALERT -- 
        alert("Keyword Search must be filled-in");
        // $("#recipe-result").empty();
        // $("#spare").empty();
        return false;
    }
    else {
        // The keyword from the input box is then added to array; clear the input
        userKeywordArray.push(keyword);
        keywordSearch = "";
        
        // calling renderKeywordList which handles the processing of our keywords array
        storeKeyword();
        renderKeywordList();
        renderQuicklinks();
        getRecipe(keyword);
        getWinePairing(keyword);    
    }
};


// When a keyword is entered in the Search input box...
// $("#searchBtn").on("click", getKeyword(keywordID));
// $("#searchBtntop").on("click", getKeyword(keywordIDtop));
$("#searchBtn").click(function(){
    getKeyword(keywordID);
});
$("#searchBtntop").click(function(){
    getKeyword(keywordIDtop);
});


// click event sets focus if 'Search' is clicked in menu to bottom Search input
$(".navbar-search-link").on("click", function() {
    console.log("navbar search link clicked");
    setFocus();
})

// 
function setFocus() {
    keywordID.focus();
    console.log("setFocus() is running");
}


// QUICKLINKS
// When an element inside the keyword <ul> is clicked...
keywordList.on("click", function (event) {
    event.preventDefault();
    
    let element = event.target;

    // If that element is a button...
    if (element.matches("#removeBtn") === true) {
        // Get its data-index value and remove the keywords element from the table
        var index = element.parentElement.parentElement.getAttribute("data-index");
        userKeywordArray.splice(index, 1);
        
        // Store updated keywords in localStorage, re-render the list
        storeKeyword();
        renderKeywordList();
        renderQuicklinks();
        }
    });




function renderQuicklinks() {
    for (let z = 0; z < userKeywordArray.length; z++) {
        let quicklinkIndex = "#ql"+z;
        let qlText = $(quicklinkIndex).text();
        $(quicklinkIndex).click(function () {
            getRecipe(qlText);
            getWinePairing(qlText);
        })
    };
};

