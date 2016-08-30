'use strict';

const Favorite = use('App/Model/Favorite');
const Drink = use('App/Model/Drink');

class FavoriteController {

  // * index(request, response) {
  //   const favorites = yield Favorite.with('user', 'drink').fetch();
  //
  //   response.jsonApi('Favorite', favorites);
  // }
  //
  // * store(request, response) {
  //   const input = request.jsonApi.getAttributesSnakeCase(attributes);
  //   const foreignKeys = {
  //     user_id: user,
  //     drink_id: drink,
  //   };
  //   const favorite = yield Favorite.create(Object.assign({}, input, foreignKeys));
  //
  //   response.jsonApi('Favorite', favorite);
  // }

  * show(request, response) {
    const userID = request.param('id');
    // const favorite = yield Favorite.with('user', 'drink').where({ userID }).firstOrFail();
    const favorite

    response.jsonApi('Favorite', favorite);
  }

  // * update(request, response) {
  //   const id = request.param('id');
  //   request.jsonApi.assertId(id);
  //
  //   const input = request.jsonApi.getAttributesSnakeCase(attributes);
  //   const foreignKeys = {
  //     user_id: user,
  //     drink_id: drink,
  //   };
    //
    // const favorite = yield Favorite.with('user', 'drink').where({ id }).firstOrFail();
    // yield favorite.update(Object.assign({}, input, foreignKeys));
    //
    // response.send(favorite);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const favorite = yield Favorite.query().where({ id }).firstOrFail();
    yield favorite.delete();

    response.status(204).send();
  }

}

module.exports = FavoriteController;
