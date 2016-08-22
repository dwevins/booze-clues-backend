const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Ingredient extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  recipe_ingredients() {
    return this.hasMany('App/Http/JsonApiViews/RecipeIngredient', true);
  }

  user_cabinets() {
    return this.hasMany('App/Http/JsonApiViews/UserCabinet', true);
  }
}

module.exports = Ingredient;
