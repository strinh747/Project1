$(document).ready(function() {

    var foodIngredients = [];

    $("#food-add-button").on("click", function(event) {
        event.preventDefault();
        var ingredient = $("#food-search-input").val();
        foodIngredients.push(ingredient);
        if (foodIngredients.length > 4) {
            foodIngredients = foodIngredients.slice(1,5);
        }
        // localStorage.setItem("food-ingredients", JSON.stringify(foodIngredients));
        $("#food-search-input").val("");
        renderFoodIngredients();
        searchRecipies(foodIngredients);
    })

    $(document).on("click", ".callout", function(){
        foodIngredients.splice( foodIngredients.indexOf($(this).find("button").attr("ingredient-data")), 1 )
        searchRecipies(foodIngredients);
    }
    )

    function renderFoodIngredients() {
        // var storedFoodIngredients = localStorage.getItem("food-ingredients");
        // foodIngredients = JSON.parse(storedFoodIngredients);
        $("#food-button-storage").empty()
        for (i=0; i<foodIngredients.length; i++) {
            var div = $('<div class="callout" data-closable>');
            var button = $('<button class="close-button" aria-label="Close alert" type="button" data-close>');
            var span = $('<span aria-hidden="true">&times;</span>');
            var p = $("<p>");
            button.append(span);
            p.text(foodIngredients[i]);
            button.attr("ingredient-data", foodIngredients[i]);
            div.append(button,p);
            $("#food-button-storage").append(div);
        }
    }

    function searchRecipies(ingredients) {

        var encodedIngredients =encodeURI(ingredients);
    
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients?number=5&ingredients="+encodedIngredients,
          //"url": "https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients?number=5&ingredients=tomatoes",
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
            "x-rapidapi-key": "JMI8oJ73JbFA1XPeI85oBxTgNRBNu0U5"
          }
        } 
        $.ajax(settings).done(function (response) {
    
          if (response.length > 0) {
            console.log(response);
            $("#ingredients-div").empty();
    
            {
              jQuery.each( response, function( i, item ) {
                var divcell = $('<div class="cell">');
                var divcard = $('<div class="card">');
                var divcardsec = $('<div class="card-section">');
                var recipeName = $("<h3>").text(item.title);
                // var imageURL = $("<a>").attr("href", item.image).append(recipeName);
                var Image = $("<img>").attr("src", item.image);
                divcardsec.append(recipeName);
                divcard.append(Image,divcardsec);
                divcell.append(divcard);
                $("#ingredients-div").append(divcell);
                var recipeId = item.id;

                $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": "https://webknox-recipes.p.rapidapi.com/recipes/"+recipeId+"/summary/",
                    "method": "GET",
                    "headers": {
                      "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
                      "x-rapidapi-key": "JMI8oJ73JbFA1XPeI85oBxTgNRBNu0U5"
                    }
                }).done(function (response) {
                    console.log(response.summary)
                    var description = $("<p>").html(response.summary);
                    divcardsec.append(description);

                  return response.summary;
                  
                }); 

              });
            }

          }
          else {
            // setResponse("Please provide me more ingredients.");
          }
    
        });
      }

})



