'use strict';

const Favorite = use('App/Model/Favorite');
const Drink = use('App/Model/Drink');
const attributes = ['user', 'drink'];

class FavoriteController {

  * index(request, response) {
    console.log('index');
    // const favorites = yield Favorite.with('user', 'drink').fetch();
    //
    // response.jsonApi('Favorite', favorites);
    const userID = request.authUser.id;
    const favorite = yield Drink.with('creator', 'recipe_ingredients.ingredient')
      .select('drinks.*')
      .join('favorites', 'drinks.id', 'favorites.drink_id')
      .where('favorites.user_id', `${userID}`);

    response.jsonApi('Drink', favorite);
  }

  * store(request, response) {
    const attrs = yield request.jsonApi.getAttributesSnakeCase(attributes);

    const foreignKeys = {
      user_id: request.authUser.id,
      drink_id: request.input('data.relationships.drink.data.id'),
    };


    const duplicateCheckTable = yield Favorite.with()
      .where('favorites.user_id', `${foreignKeys.user_id}`)
      .where('favorites.drink_id', `${foreignKeys.drink_id}`);

    if (duplicateCheckTable.length != 0) {
      response.conflict('You have already favorited this drink');
    } else {
      const favorite = yield Favorite.create(Object.assign({}, attrs, foreignKeys));
      yield favorite.related('user').load();

      response.jsonApi('Favorite', favorite);
    }
  }

  * show(request, response) {
    const userID = request.authUser.id;
    const drinkID = request.param('id');
    const favorite = yield Favorite.query()
      .where('favorites.user_id', `${userID}`)
      .where('favorites.drink_id', `${drinkID}`);

    response.jsonApi('Favorite', favorite);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
      drink_id: request.input('data.relationships.drink.data.id'),
    };

    const favorite = yield Favorite.with('user', 'drink').where({ id }).firstOrFail();
    yield favorite.update(Object.assign({}, input, foreignKeys));

    response.send(favorite);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const favorite = yield Favorite.query().where({ id }).firstOrFail();
    yield favorite.delete();

    response.status(204).send();
  }

}

module.exports = FavoriteController;
