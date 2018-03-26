// Initial array of cities
var cities = ["Phoenix", "Tucson", "St. George", "Salt Lake City", "Albuquerque", "Santa Fe", "Colorado Springs", "Denver"];
var goodCitySearches =
{
    "phoenix": "Phoenix",
    "pheonix": "Phoenix",
    "phoenixaz": "Phoenix",
    "pheonixaz": "Phoenix",
    "phenixaz": "Phoenix",
    "phoenixarizona": "Phoenix",
    "pheonixarizona": "Phoenix",
    "phenixarizona": "Phoenix",
    "tucson": "Tucson",
    "tuscon": "Tucson",
    "tusconaz": "Tucson",
    "tucsonaz": "Tucson",
    "tucsonarizona": "Tucson",
    "tusconarizona": "Tucson",
    "stgeorge": "St. George",
    "stgeorgeut": "St. George",
    "stgeorgeutah": "St. George",
    "saintgeorge": "St. George",
    "saintgeorgeut": "St. George",
    "saintgeorgeutah": "St. George",
    "saltlakecity": "Salt Lake City",
    "saltlakecityut": "Salt Lake City",
    "saltlakecityutah": "Salt Lake City",
    "slc": "Salt Lake City",
    "slcut": "Salt Lake City",
    "slcutah": "Salt Lake City",
    "albuquerque": "Albuquerque",
    "albuequerque": "Albuquerque",
    "albuquerquenm": "Albuquerque",
    "albuequerquenm": "Albuquerque",
    "albuquerquenewmexico": "Albuquerque",
    "albuequerquenewmexico": "Albuquerque",
    "santafe": "Santa Fe",
    "santafenm": "Santa Fe",
    "santafenewmexico": "Santa Fe",
    "coloradosprings": "Colorado Springs",
    "coloradospringsco": "Colorado Springs",
    "coloradospringscolorado": "Colorado Springs",
    "denver": "Denver",
    "dever": "Denver",
    "denverco": "Denver",
    "deverco": "Denver",
    "denvercolorado": "Denver",
    "devercolorado": "Denver"
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

//function to hide result cards
$(document).ready(function () {

    $("#api1").addClass("hidden");
    $("#api2").addClass("hidden");
    $("#api3").addClass("hidden");

    // var modal = document.getElementById('myModal');

    // var span = document.getElementById("closeModal")[0];
    
    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    // };

    // When the user clicks anywhere outside of the modal, close it

//function to display school district API
//Assigning variable data to each city in order to call APIs 
function displaySchoolInfo(cityText) {
    if (!$(this).attr("data-name")) {
        var city = cityText;
    }
    else {
        var city = $(this).attr("data-name");
    }

    if (city === "Phoenix") {
        var st = "AZ";
        var place = "55000";
        var county = "013";
        var state = "04";
    }

    else if (city === "Tucson") {
        var st = "AZ";
        var place = "77000";
        var county = "019";
        var state = "04";

    }

    else if (city === "St. George") {
        var st = "UT";
        var place = "65330";
        var county = "053";
        var state = "49";
    }

    else if (city === "Salt Lake City") {
            var st = "UT";
            var place = "67000";
            var county = "035";
            var state = "49";
    }

    else if (city === "Albuquerque") {
        var st = "NM";
        var place = "02000";
        var county = "01";
        var state = "35";
    }

    else if (city === "Santa Fe") {
        var city = "santafe";
        var st = "NM";
        var place = "70500";
        var county = "049";
        var state = "35";
    }

    else if (city === "Denver") {
        var st = "CO";
        var place = "20000";
        var county = "031";
        var state = "08";
    }

    else if (city === "Colorado Springs") {
        var st = "CO";
        var place = "16600";
        var county = "041";
        var state = "08";
    }

    else {
       
    }

    var query = "https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=place:" + place + "&in=county:" + county + "&in=state:" + state + "&key=9600ff656f29528f494f981fbe227969244fdfc0"

    console.log(query);

    $.ajax({
        dataType: 'json',
        url: query,
        method: "GET",
    }).then(function (censusResponse) {

        $("#pop-view").empty();

            // Creating a div to hold the census data
            var censusDiv = $("<div class='census'>");

            // Storing the name data
            var pop = censusResponse[1][0];
            console.log(pop);

            // Creating an element to have the name displayed
            var pOne = $("<p>").text("Population: " + pop);
            console.log(pop);

            // Displaying the population
            censusDiv.append(pOne);
        
            // Displaying the division
            var pTwo= $("<hr>")
            censusDiv.append(pTwo)

            //Displaying result
            $("#pop-view").prepend(censusDiv);
    });

    if (city === "St. George")
    {
        city = "Saint George";
    }
    var queryURL = "https://api.schooldigger.com/v1.1/districts?st=" + st + "&city=" + city + "&appID=5aff21be&appKey=771c87d4084c3aa107c831689cb4a332"
    
    //CORS solution to allow prper access
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && $.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    
    $.ajax({
        dataType: 'json',
        //cache: false,
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        $("#schools-view").empty();

        for (var i = 0; i < response.districtList.length; i++) {
            // Creating a div to hold the school
            var schoolDiv = $("<tr class='schools'>");

            // Storing the name data
            var name = response.districtList[i].districtName;

            // Creating an element to have the name displayed
            var pOne = $("<p>").text("Name:  " + name);
            console.log(name);

            // Displaying the name
            schoolDiv.append(pOne);

            //Storing the street
            var street = response.districtList[i].address.street;

            var pTwo = $("<p>").text("Street Address: " + street);
            console.log(street);

            //Displaying the street
            schoolDiv.append(pTwo);

            // Storing the zip code
            var zip = response.districtList[i].address.zip;

            // Creating an element to hold the zip code
            var pThree = $("<p>").text("Zip code: " + zip);
            console.log(zip);

            // Displaying the zip code
            schoolDiv.append(pThree);

            var rank = response.districtList[i].rankHistory ? response.districtList[i].rankHistory[0].rank : null;
            var rankOf = response.districtList[i].rankHistory ? response.districtList[i].rankHistory[0].rankOf : null;
           
            console.log(rank);

            //If rank exists display string of state rank else display no rank provide
            var pFour = rank ? $("<p>").text("Rank: " + rank + " of " + rankOf) : "No rank provided";

            // Displaying the school rank
            schoolDiv.append(pFour);

            // Appending the division
            var pFive = $("<hr>")
            schoolDiv.append(pFive);

            // Putting the entire apartment above the previous schools
            $("#schools-view").prepend(schoolDiv);
        };
    });
};

// displayHousingInfo function re-renders the HTML to display the appropriate content
function displayHousingInfo(cityText) {
    if (!$(this).attr("data-name")) {
        var city = cityText;
    }
    else {
        var city = $(this).attr("data-name");
    }

    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+of+interest+in+" + city + "&key=AIzaSyB88OyuQr7ZsKoh3RKFpJp7S89kA6JFkxU&libraries=places";


    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && $.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


    // Creating an AJAX call for the specific profile card
    $.ajax({
        dataType: 'json',
        //cache: false,
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.results);
        
      for (var i = 0; i < 5; i++) {

        // Creating a div to hold the profile image
        var profDiv = $("<div class='prof'>");

        // Creating a div to hold the image
        var imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=275&photoreference=" +
        response.results[i].photos[0].photo_reference + "&key=AIzaSyB88OyuQr7ZsKoh3RKFpJp7S89kA6JFkxU&libraries=places";

        // Creating an element to hold the image
        var profImg = $("<img>").attr("src", imgURL);

        // Appending the image
        profDiv.append(profImg);

        // Storing the name data
        var profName = response.results[i].name;

        console.log(profName);

        // Creating an element to have the name displayed
        var pOne = $("<p>").text(profName);

        // Displaying the name
        profDiv.append(pOne);

        // Appending the division
        var pTwo= $("<hr>")
        profDiv.append(pTwo);

        // Putting the entire apartment above the previous apartments
        $("#prof-view").append(profDiv);
      }

    });


    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=apartments+for+rent+in+" + city + "&key=AIzaSyB88OyuQr7ZsKoh3RKFpJp7S89kA6JFkxU&libraries=places";



    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && $.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


    // Creating an AJAX call for apartments list
    $.ajax({
        dataType: 'json',
        //cache: false,
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.results);

        $("#cities-view").empty();
        // Creating a div to hold the movie
        for (var i = 0; i < 10; i++) {

            var housingDiv = $("<div class='housing'>");

            // Storing the name data
            var name = response.results[i].name;

            console.log(name);

            // Creating an element to have the name displayed
            var pOne = $("<p>").text("Name: " + name);

            // Displaying the name
            housingDiv.append(pOne);

            // Storing the address
            var address = response.results[i].formatted_address;

            // Creating an element to hold the address
            var pTwo = $("<p>").text("Address: " + address);

            // Displaying the address
            housingDiv.append(pTwo);

            //Storing the address
            var rating = response.results[i].rating;

            // Creating an element to hold the rating
            var pThree = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            housingDiv.append(pThree);

            // Retrieving the URL for the image
            var imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=275&photoreference=" +
                response.results[i].photos[0].photo_reference + "&key=AIzaSyB88OyuQr7ZsKoh3RKFpJp7S89kA6JFkxU&libraries=places";

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            housingDiv.append(image);

            // Appending the division
            var pFour= $("<hr>")
            housingDiv.append(pFour);

            // Putting the entire apartment above the previous apartments
            $("#cities-view").prepend(housingDiv);

        }

    })
};


// Function for displaying city data (when we had buttons)
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each city in the array
        var a = $("<button + type='button' + class='btn btn-primary btn-sm'>");
        // Adding a class of movie-btn to our button
        a.addClass("city-btn");
        // Adding a data-attribute
        a.attr("data-name", cities[i]);
        // Providing the initial button text
        a.text(cities[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
};

$('#closeModal').on('click', function() {         
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    return;  }
);

function removeAllSpacesCommasPeriods(str)
{
    return str.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "");
}

// This function handles events where a city button is clicked
$("#add-city").on("click", function (event) {

    event.preventDefault();
    var cityInput = $("#city-input").val().trim();
    console.log(cityInput);
    console.log(typeof (cityInput));
    console.log(cityInput === cities[0]);

    var lowerCityInput = cityInput.toLowerCase().trim();
    var lowerAlphaCityInput = removeAllSpacesCommasPeriods(lowerCityInput);

    var validatedCity = goodCitySearches[lowerAlphaCityInput];

    if (validatedCity === undefined)
    {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        return;
    }


    // Hiding the other sections to display result cards
    $("#index-banner").addClass("hidden");
    $("#icons-div").addClass("hidden");
    $("#api1").removeClass("hidden");
    $("#api2").removeClass("hidden");
    $("#api3").removeClass("hidden");

    displayHousingInfo(validatedCity);
    displaySchoolInfo(validatedCity);
});

//Added Page Reload On Home and Logo Click//
$(".home").on('click', function() {
    location.reload();
});



// Adding a click event listener to all elements with a class of "city-btn"
$(document).on("click", ".city-btn", displayHousingInfo, displaySchoolInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();

});
