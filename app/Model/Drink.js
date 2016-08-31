'use strict';

const Lucid = use('Lucid');

class Drink extends Lucid {

  static loadRelations(queryable, user) {
    return queryable.with('creator', 'recipeIngredients.ingredient', 'favorites')
      .scope('favorites', (query) => {
        if (user) {
          return query.where('user_id', user.id);
        }

        return query.where('user_id', 0);
      });
  }

  creator() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  recipeIngredients() {
    return this.hasMany('App/Model/RecipeIngredient');
  }

  favorites() {
    return this.hasMany('App/Model/Favorite');
  }
}

module.exports = Drink;
