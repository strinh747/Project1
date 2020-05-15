$(document).ready(function() {

    var urlParams = getUrlVars();
    getCocktailRecipe(urlParams);
    console.log(urlParams)
    
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    $(document).on("click", ".card", function(){
      console.log($(this).attr("id"))
      getCocktailRecipe($(this).attr("id"));
    }
    )

    function getCocktailRecipe(urlParam) {
      
      console.log(urlParam);
      var recipeId =urlParam["recipeId"];

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + recipeId,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "fd013058a6msh0ecbe48adf23f07p1ebed4jsnb083bffefd39"
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        var drink = response.drinks[0];
        
        var recipeTitle = $("<h2>").text(drink.strDrink);
        var image = $("<img>").attr("src", drink.strDrinkThumb);
        var ingredientsHead = $("<h3>").text("Ingredients");
        
        var ingredientList = [];
        for(i=1;i<16;i++) {
          strIngredient = "strIngredient" + i;
          console.log(strIngredient);
          ingredientList.push(drink[strIngredient]);
          console.log(drink[strIngredient]);
          console.log(ingredientList);
        }
        var ingredients = $("<ul>");
        for(i=0;i<ingredientList.length; i++) {
          if (ingredientList[i]!== null) {
            var li = $("<li>").text(ingredientList[i]);
            ingredients.append(li);
          }
        }

        var directionsHead = $("<h3>").text("Directions");
        var directions = $("<p>").text(drink.strInstructions);
        $("#title").append(recipeTitle,image,ingredientsHead,ingredients,directionsHead,directions);

      });

    }

})



