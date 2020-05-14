$(document).ready(function() {

    var foodIngredients = [];
    var cocktailIngredients = [];

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

    $("#cocktail-add-button").on("click", function(event) {
      event.preventDefault();
      var ingredient = $("#cocktail-search-input").val();
      cocktailIngredients.push(ingredient);
      if (cocktailIngredients.length > 1) {
          cocktailIngredients = cocktailIngredients.slice(1,2);
      }
      // localStorage.setItem("cocktail-ingredients", JSON.stringify(cocktailIngredients));
      $("#cocktail-search-input").val("");
      renderCocktailIngredients();
      searchCocktails(cocktailIngredients);
  })


    $(document).on("click", ".callout", function(){
        foodIngredients.splice( foodIngredients.indexOf($(this).find("button").attr("ingredient-data")), 1 )
        searchRecipies(foodIngredients);
    }
    )

    $(document).on("click", ".callout", function(){
      cocktailIngredients.splice(cocktailIngredients.indexOf($(this).find("button").attr("cocktail-data")), 1 )
      searchCocktails(cocktailIngredients);
  }
  )

  $(document).on("click", ".card", function(){
    console.log($(this).attr("id"))
    getCocktailRecipe($(this).attr("id"));
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

    function renderCocktailIngredients() {
      // var storedCocktailIngredients = localStorage.getItem("cocktail-ingredients");
      // cocktailIngredients = JSON.parse(storedCocktailIngredients);
      $("#cocktail-button-storage").empty()
      for (i=0; i<cocktailIngredients.length; i++) {
          var div = $('<div class="callout" data-closable>');
          var button = $('<button class="close-button" aria-label="Close alert" type="button" data-close>');
          var span = $('<span aria-hidden="true">&times;</span>');
          var p = $("<p>");
          button.append(span);
          p.text(cocktailIngredients[i]);
          button.attr("cocktail-data", cocktailIngredients[i]);
          div.append(button,p);
          $("#cocktail-button-storage").append(div);
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
                var recipeId = item.id;
                var divcell = $('<div class="cell">');
                var divcard = $('<div class="card">');
                var divcardsec = $('<div class="card-section">');
                var recipeName = $("<h3>").text(item.title);
                var recipeURl = $("<a>").attr("href", "single.html?recipeId="+recipeId).append(recipeName);
                var Image = $("<img>").attr("src", item.image);
                divcardsec.append(recipeURl);
                divcard.append(Image,divcardsec);
                divcell.append(divcard);
                $("#ingredients-div").append(divcell);
                

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

    function searchCocktails(ingredients) {

      var encodedIngredients =encodeURI(ingredients);
  
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + encodedIngredients,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "fd013058a6msh0ecbe48adf23f07p1ebed4jsnb083bffefd39"
        }
      }
      $.ajax(settings).done(function (response) {
        if (response.drinks.length > 0) {
          $("#cocktails-div").empty();
          {
            jQuery.each(response.drinks, function( i, item ) {
              var divcell = $('<div class="cell">');
              var divcard = $('<div class="card" id="' + item.idDrink + '">');
              var divcardsec = $('<div class="card-section">');
              var recipeName = $("<h3>").text(item.strDrink);
              // var imageURL = $("<a>").attr("href", item.image).append(recipeName);
              var Image = $("<img>").attr("src", item.strDrinkThumb);
              
              divcardsec.append(recipeName);
              divcard.append(Image,divcardsec);
              var a = $('<a href="#' + item.idDrink + 'modal" rel="modal:open">').html(divcard);
              divcell.append(a);
              $("#cocktails-div").append(divcell);
              
              

              // $.ajax({
              //     "async": true,
              //     "crossDomain": true,
              //     "url": "https://webknox-recipes.p.rapidapi.com/recipes/"+recipeId+"/summary/",
              //     "method": "GET",
              //     "headers": {
              //       "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
              //       "x-rapidapi-key": "JMI8oJ73JbFA1XPeI85oBxTgNRBNu0U5"
              //     }
              // }).done(function (response) {
              //     console.log(response.summary)
              //     var description = $("<p>").html(response.summary);
              //     divcardsec.append(description);

              //   return response.summary;
                
              // }); 

            });
          }

        }
        else {
          // setResponse("Please provide me more ingredients.");
        }
  
      });
    }


    function getCocktailRecipe(id) {
      
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "fd013058a6msh0ecbe48adf23f07p1ebed4jsnb083bffefd39"
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);

        var div = $('<div class="modal">').attr("id", id + "modal");
        var p = $('<p>');
        var a = $('<a href="#" rel="modal:close">').text("Close");
        p.text(JSON.stringify(response.drinks[0]));
        div.append(p,a);
        $("#cocktails-div").append(div);

        
      });

    }
})



