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
            $("#title").append(recipeTitle,image,directions);

            jQuery.each(response.analyzedInstructions[0].steps, function( i, item ) {
              var step = $("<li class='directions'>").text(item.step);
              $("#title").append(step);
            });

            
            console.log(response.extendedIngredients);

            
            jQuery.each(response.extendedIngredients, function( i, item ) {
              var itemDiv = $('<div class="small-10 medium-3 columns">');
              
              var image = $("<img>").attr("src", "https://spoonacular.com/cdn/ingredients_100x100/"+item.image);
              var itemName = $("<h4>").text(item.name);
              var itemOriginal = $("<h6>").text(item.original);
              var amount = $("<h6>").text(item.amount);
              var unit = $("<h6>").text(item.unit);
              itemDiv.append(image,itemName,itemOriginal,amount, unit);
              $("#card-divider").append(itemDiv);
              
            });
            

        });
      }
})



