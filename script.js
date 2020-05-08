$(document).ready(function() {

    var foodIngredients = [];


    $("#food-add-button").on("click", function() {
        var ingredient = $("#food-search-input").val();
        foodIngredients.push(ingredient);
        if (foodIngredients.length > 4) {
            foodIngredients = foodIngredients.slice(1,5);
        }
        localStorage.setItem("food-ingredients", JSON.stringify(foodIngredients));
        renderFoodIngredients();
    })

    function renderFoodIngredients() {
        var storedFoodIngredients = localStorage.getItem("food-ingredients");
        foodIngredients = JSON.parse(storedFoodIngredients);
        $("#food-button-storage").empty()
        for (i=0; i<foodIngredients.length; i++) {
            var div = $("<div>");
            var button = $("<button>");
            button.text(foodIngredients[i]);
            button.attr("class", "button food-button");
            button.attr("ingredient-data", foodIngredients[i]);
            div.append(button);
            $("#food-button-storage").prepend(div);
        }
    }
})