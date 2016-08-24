'use strict';

const fetch = require('universal-fetch');
const Drink = use('App/Model/Drink');
const Ingredient = use('App/Model/Ingredient');
const RecipeIngredient = use('App/Model/RecipeIngredient');
const Env = use('Env');
const _ = require('lodash');

const getValuesForRecipeIngredient = (drinks, ingredients, data) => {
  const drink = _.find(drinks, { drink_id: data.drink_id });
  const ingredient = _.find(ingredients, { ingredient_id: data.id });
  return RecipeIngredient.create({
    drink_id: drink.id,
    ingredient_id: ingredient.id,
    addb_measure: data.textPlain,
  });
};

const makeDrink = (drink) => {
  const drinkAttrs = {
    drink_id: drink.id,
    name: drink.name,
    recipe: drink.descriptionPlain,
    photo_url: `http://assets.absolutdrinks.com/drinks/transparent-background-white/${drink.id}.png`,
    user_id: null,
  };

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

    const recipeIngredientData = yield _.chain(apiData.result)
        .map((drink) => {
          return drink.ingredients.map((ingredient) => {
            return Object.assign({ drink_id: drink.id }, ingredient);
          });
        })
        .flatten()
        .map((data) => getValuesForRecipeIngredient(drinks, ingredients, data))
        .value();

    return response.send(recipeIngredientData);

    return response.send({
      drinks,
      ingredients,
    });
  }
}

module.exports = ScrapeController;
