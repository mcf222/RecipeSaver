const express = require('express');
const router = express.Router();

const recipes = [];
/* this get route handles the regular "get" command that returns a JSON listing of all recipes in memory */
router.get('/', function(req, res, next) {
    res.send(recipes);
});

/* this route handles a post request to add a recipe, the schema for the user must include:
{
  "Recipe": "recipe_name"
} 
*/
router.post('/', function(req, res, next) {
  
  var copy = false;
  /* checks to ensure that the body of the request has the property "Recipe" */
  if ((req.body).hasOwnProperty("Recipe")){
    var recipe = req.body.Recipe;
    /* checking to see if the recipe already exists or not */
    for (i = 0; i < recipes.length; i++){
      if (recipes[i].Recipe === recipe){
        copy = true;
      }
    }
    /* if recipe does not exist, creates a recipe object with given Recipe and sends 201 response to show
    that the recipe was created successfully */
    var obj = {Recipe: recipe};
    if (copy == false){
      recipes.push(obj);
      res.status(201).send("Recipe Created: " + recipe);
    }
    /* if the user exists, sends a 404 error as two users cannot exist with the same recipe */
    else {
      res.status(404).send("Recipe " + recipe + " already exists");
    }
  }
  /* if the request's body does not follow the schema, sends a 404 error as it was unable 
  to fulfill the request */
  else {
    res.status(404).send("JSON body does not follow schema");
  }
});


/* this route handles a request to delete a recipe and accepts one parameter of the recipe to delete */
router.delete('/:recipe_name', function(req, res, next) {
  var recipe_name = req.params.recipe_name;
  var found = false;
  var x = 0;
  /* given the parameter, find the position of the user within the global array */ 
  for (i = 0; i < recipes.length; i++){
    if (recipes[i].Recipe === recipe_name){
      x = i;
      found = true;
      break;
    }
  }
  /* if the recipe exists, remove the recipe from the array and send 200 response to show 
  it has been successfully removed */
  if (found){
    recipes.splice(x,1);
    res.status(200).send("Recipe deleted: " + recipe_name);
  }
  /* if the recipe does not exist, send a 404 error */
  else{
    res.status(404).send("Recipe " + recipe_name + " does not exist");
  }
});

module.exports = router;
