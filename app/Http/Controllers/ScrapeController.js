'use strict';

const fetch = require('universal-fetch');
const Drink = use('App/Model/Drink');
const Ingredient = use('App/Model/Ingredient');
const RecipeIngredient = use('App/Model/RecipeIngredient');
const Env = use('Env');
const _ = require('lodash');

const makeDrink = (drink) => {
  const drinkAttrs = {
    drink_id: drink.id,
    name: drink.name,
    recipe: drink.descriptionPlain,
    photo_url: `http://assets.absolutdrinks.com/drinks/transparent-background-white/${drink.id}.png`,
    user_id: null,
  };

  // drink.ingredients.map((ingredient) => {
  //   const ingredientAttrs = {
  //     drink_id: drink.id,
  //     ingredient_id: ingredient.id,
  //     quantity: null,
  //     measure: null,
  //     addb_measure: ingredient.textPlain,
  //   };
  //
  //   RecipeIngredient.create(ingredientAttrs);
  // });

  return Drink.create(drinkAttrs);
};

const getNormalizedIngredientItem = (ingredient) => {
  const [, name] = ingredient.text.match(/\[(.+)\]/);

  return {
    ingredient_id: ingredient.id,
    name,
  };
};

const getNormalizedIngredients = (drink) => drink.ingredients.map(getNormalizedIngredientItem);


class ScrapeController {
  * store(request, response) {
    const key = Env.get('API_KEY');
    const drinkURL = `http://addb.absolutdrinks.com/drinks/alcoholic/?apiKey=${key}&start=0&pageSize=1024`;

    const apiData = yield fetch(drinkURL).then((res) => res.json());

    const ingredientData = _.chain(apiData.result)
      .map(getNormalizedIngredients)
      .flatten()
      .uniqBy('ingredient_id')
      .value();

    const ingredients = yield ingredientData.map((ingredient) => Ingredient.create(ingredient));

    const drinks = yield apiData.result.map(makeDrink);

    const recipeIngredientData = _.chain(apiData.result)
        .map((drink) => {
          return drink.ingredients.map((ingredient) => {
            return Object.assign({ drink_id: drink.id }, ingredient);
          });
        })
        .flatten()
        .value();

    return response.send(recipeIngredientData);

    return response.send({
      drinks,
      ingredients,
    });
  }
}

module.exports = ScrapeController;
