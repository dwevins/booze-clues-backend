const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Drink extends JsonApiView {
  get attributes() {
    return ['name', 'recipe', 'photo_url'];
  }

  creator() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'drinks',
    });
  }

  recipeIngredients() {
    return this.hasMany('App/Http/JsonApiViews/RecipeIngredient', {
      included: true,
      excludeRelation: 'drink',
    });
  }

  favorites() {
    return this.hasMany('App/Http/JsonApiViews/Favorite', {
      included: false,
      excludeRelation: 'drink',
    });
  }
}

module.exports = Drink;
