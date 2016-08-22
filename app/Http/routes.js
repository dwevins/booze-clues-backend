'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.any('/', function * (request, response) {
  response.json({
    jsonapi: {
      version: '1.0',
    },
    data: {
    },
    meta: {
      uptime: process.uptime(),
    },
  });
});

Route.resource('/drinks', 'DrinkController').except(['create', 'edit']);
Route.resource('/ingredients', 'IngredientController').except(['create', 'edit']);
Route.resource('/favorites', 'FavoriteController').except(['create', 'edit']);

Route.post('/users', 'UserController.store');
Route.post('/token', 'SessionController.store');
