const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Ingredient extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  recipeIngredients() {
    return this.hasMany('App/Http/JsonApiViews/RecipeIngredient', true);
  }

  userCabinets() {
    return this.hasMany('App/Http/JsonApiViews/UserCabinet', true);
  }
}

module.exports = Ingredient;
