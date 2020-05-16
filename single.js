$(document).ready(function() {

    var urlParams = getUrlVars();
    searchRecipe(urlParams);
    
    
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

    


    function searchRecipe(urlParam) {

        console.log(urlParam);
        var recipeId =urlParam["recipeId"];

    
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information",
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
            "x-rapidapi-key": "JMI8oJ73JbFA1XPeI85oBxTgNRBNu0U5"
          }
        } 
        $.ajax(settings).done(function (response) {
            console.log(response);

            var recipeTitle = $("<h2>").text(response.title);
            var image = $("<img>").attr("src", response.image);
            var directions = $("<h3>").text("Directions");

            var instructions = $("<ul class='instructions'>");
            jQuery.each(response.analyzedInstructions[0].steps, function( i, item ) {
              var step = $("<li>").text(item.step);
              instructions.append(step);
            });
            $("#title").append(recipeTitle,image,directions,instructions);

            
            var ingredientsHead = $("<h3>").text("Ingredients");
            $("#spoonacular-ingredient-vis-grid").append(ingredientsHead);

            
            jQuery.each(response.extendedIngredients, function( i, item ) {
              var itemDiv = $('<div style="float:left">');
              var itemIngredient = $('<div class="spoonacular-ingredient">');
              var itemUnit = $('<div class="spoonacular-amount t12 spoonacular-us" style="display:block;">').text(item.amount+" "+item.unit);
              var itemDivImg =$('<div class="spoonacular-image-wrapper">');
              var image = $("<img>").attr("src", "https://spoonacular.com/cdn/ingredients_100x100/"+item.image);
              var itemOriginal = $('<div class="spoonacular-name t10">').text(item.original);
              
              itemDivImg.append(image);
              itemIngredient.append(itemUnit,itemDivImg,itemOriginal);
              itemDiv.append(itemIngredient);

              $("#spoonacular-ingredient-vis-grid").append(itemDiv);
            });

            

            /*
            <div style="float:left">
              <div class="spoonacular-ingredient">
                <div class="spoonacular-amount t12 spoonacular-metric" style="display:none;" amount="6.0">6 </div>
                <div class="spoonacular-amount t12 spoonacular-us" style="display:block;" amount="6.0">6 </div>
                <div class="spoonacular-image-wrapper"><img src="https://spoonacular.com/cdn/ingredients_100x100/hard-boiled-egg.png" title="6  hardboiled eggs" alt="6  hardboiled eggs" /></div>
                <div class="spoonacular-name t10">hardboiled eggs</div>
              </div>
            </div>
            */
            

        });
      }
})



