'use strict';

const UserCabinet = use('App/Model/UserCabinet');

class UserCabinetController {

  * index(request, response) {
    const userCabinets = yield UserCabinet.with('user_id', 'ingredient').fetch();

    response.jsonApi('UserCabinet', userCabinets);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: user_id,
      ingredient_id: ingredient,
    };
    const userCabinet = yield UserCabinet.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('UserCabinet', userCabinet);
  }

  * show(request, response) {
    const id = request.param('id');
    const userCabinet = yield UserCabinet.with('user_id', 'ingredient').where({ id }).firstOrFail();

    response.jsonApi('UserCabinet', userCabinet);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: user_id,
      ingredient_id: ingredient,
    };

    const userCabinet = yield UserCabinet.with('user_id', 'ingredient').where({ id }).firstOrFail();
    yield userCabinet.update(Object.assign({}, input, foreignKeys));

    response.send(userCabinet);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const userCabinet = yield UserCabinet.query().where({ id }).firstOrFail();
    yield userCabinet.delete();

    response.status(204).send();
  }

}

module.exports = UserCabinetController;
