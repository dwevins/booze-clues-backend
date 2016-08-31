'use strict';

const Drink = use('App/Model/Drink');
const RecipeIngredient = use('App/Model/RecipeIngredient');
const attributes = ['name', 'recipe', 'photo-url'];

class DrinkController {

  * index(request, response) {
    const { number, size } = request.input('page') || { number: 1, size: 5 };
    const name = request.input('name') || undefined;
    const ingredients = request.input('ingredients') || undefined;


    if (!name) {
      if (ingredients) {
        const Database = use('Database');
        const subQuery =  Database
          .from('recipe_ingredients')
          .whereNotIn('ingredient_id', ingredients.split(','))
          .select('drink_id');

        const drinks = yield Drink.loadRelations(Drink, request.authUser)
          .select('drinks.*')
          .join('recipe_ingredients', 'drinks.id', 'recipe_ingredients.drink_id')
          .whereNotIn('recipe_ingredients.drink_id', subQuery)
          .groupBy('drinks.id')
          .forPage(parseInt(number), parseInt(size))
          .fetch();
          // .toSQL().sql;
          // needs to show full matches only

        response.jsonApi('Drink', drinks);
      } else {
        const drinks = yield Drink.loadRelations(Drink)
          .orderBy('name', 'asc')
          .forPage(parseInt(number), parseInt(size))
          .fetch();

        response.jsonApi('Drink', drinks);
      }
    } else {
      const drinks = yield Drink.loadRelations(Drink, request.authUser)
      .where('name', 'ilike', `%${name}%`)
      .forPage(parseInt(number), parseInt(size))
      .fetch();

      response.jsonApi('Drink', drinks);
    }
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };
    const drink = yield Drink.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Drink', drink);
  }

  * show(request, response) {
    const id = request.param('id');
    const drink = yield Drink.loadRelations(Drink, request.currentUser)
      .where({ id }).firstOrFail();
    response.jsonApi('Drink', drink);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };

    const drink = yield Drink.with('creator').where({ id }).firstOrFail();
    yield drink.update(Object.assign({}, input, foreignKeys));

    response.send(drink);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const drink = yield Drink.query().where({ id }).firstOrFail();
    yield drink.delete();

    response.status(204).send();
  }

}

module.exports = DrinkController;
